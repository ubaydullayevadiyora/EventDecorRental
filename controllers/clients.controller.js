const { errorHandler } = require("../helpers/error_handler")
const Clients = require("../models/clients.model")
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require('config');
const { sendOtpMail } = require("../services/mail.service");
const mailService = require("../services/mail.service");

const REFRESH_TOKEN_SECRET = config.get("jwt.client.refresh_key");

const addNewClient = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, password, refresh_token, otp } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const newClient = await Clients.create({ first_name, last_name, phone_number, email, password: hashedPassword, refresh_token, otp })
        res.status(201).send({ message: "new client added", newClient })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllClients = async (req, res) => {
    try {
        const clients = await Clients.findAll();

        if (!clients || clients.length === 0) {
            return res.status(404).json({ message: "clients not found" });
        }

        res.status(200).json({ message: "Here you are", clients });
    } catch (error) {
        console.error("getAllClients error:", error);
        errorHandler(error, res);
    }
};

const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Clients.findByPk(id);
        res.status(201).send({ message: "here you are", client })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateClient = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { first_name, last_name, phone_number, email, password, refresh_token, otp } = req.body
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }
        const client = await Clients.update(
            { first_name, last_name, phone_number, email, password, refresh_token, otp },
            { where: { id }, returning: true }
        );
        res.status(201).json({ client: client[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Clients.destroy({ where: { id } });
        res.status(201).send({ message: "deleted client", client })
    } catch (error) {
        errorHandler(error, res)
    }

}

// loginClient, 

const loginClient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await Clients.findOne({ where: { email } });
        if (!client) return res.status(404).json({ message: "Client not found" });
        // console.log("DB password:", client.password);
        // console.log("Input password:", password);
        const isMatch = await bcrypt.compare(password, client.password);
        // console.log("Password match?", isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const tokens = jwtService.generateTokens({ id: client.id, email: client.email, role: "client" });

        await client.update({ refresh_token: tokens.refreshToken });

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// logoutClient,

const logoutClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Clients.findByPk(id);
        if (!client) return res.status(404).json({ message: "Client not found" });

        await client.update({ refresh_token: null });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        errorHandler(error, res);
    }
};

// refreshToken,

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: "Token required" });

        const client = await Clients.findOne({ where: { refresh_token: refreshToken } });
        if (!client) return res.status(403).json({ message: "Invalid refresh token" });

        const decoded = await jwtService.verifyRefreshToken(refreshToken);

        const tokens = jwtService.generateTokens({ id: client.id, email: client.email });

        await client.update({ refresh_token: tokens.refreshToken })

            res.status(200).json({
                message: "Token refreshed",
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
    } catch (error) {
        errorHandler(error, res);
    }
};

// sendOtp 

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const client = await Clients.findOne({ where: { email } });
        if (!client) return res.status(404).json({ message: "Client not found" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        await Clients.update({ otp }, { where: { id: client.id } });

        await mailService.sendOtpMail(email, otp);

        res.status(200).json({ message: "OTP sent to email!" });
        // console.log(email)

    } catch (error) {
        errorHandler(error, res);
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;     

        const client = await Clients.findOne({ where: { email } });
        if (!client) return res.status(404).json({ message: "Client not found" });

        if (client.otp === String(otp)) {
            return res.status(200).json({ message: "OTP verified successfully!" });
        } else {
            return res.status(400).json({ message: "Invalid OTP!" });
        }
    } catch (err) {
        console.error("verifyOtp error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addNewClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,

    loginClient,
    logoutClient,
    refreshToken,
    sendOtp,
    verifyOtp,
}