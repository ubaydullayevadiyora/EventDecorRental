const { errorHandler } = require("../helpers/error_handler")
const Owners = require("../models/owner.model")
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require('config');
const { sendOtpMail } = require("../services/mail.service");
const mailServise = require("../services/mail.service");

const REFRESH_TOKEN_SECRET = config.get("jwt.admin.refresh_key");

const addNewOwner = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, password, refresh_token, otp } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOwner = await Owners.create({ first_name, last_name, phone_number, email, password: hashedPassword, refresh_token, otp })
        res.status(201).send({ message: "new owner added", newOwner })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllOwners = async (req, res) => {
    try {
        const owners = await Owners.findAll();

        if (!owners || owners.length === 0) {
            return res.status(404).json({ message: "owners not found" });
        }

        res.status(200).json({ message: "Here you are", owners });
    } catch (error) {
        console.error("getAllOwners error:", error);
        errorHandler(error, res);
    }
};

const getOwnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Owners.findByPk(id);
        res.status(201).send({ message: "here you are", owner })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateOwner = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { first_name, last_name, phone_number, email, password, refresh_token, otp } = req.body

        const owner = await Owners.update(
            { first_name, last_name, phone_number, email, password, refresh_token, otp },
            { where: { id }, returning: true }
        );
        res.status(201).json({ owner: owner[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Owners.destroy({ where: { id } });
        res.status(201).send({ message: "deleted owner", owner })
    } catch (error) {
        errorHandler(error, res)
    }

}

// loginOwner, 

const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;

        const owner = await Owners.findOne({ where: { email } });
        if (!owner) return res.status(404).json({ message: "Owner not found" });
        console.log("DB password:", owner.password);
        console.log("Input password:", password);
        const isMatch = await bcrypt.compare(password, owner.password);
        console.log("Password match?", isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const tokens = jwtService.generateTokens({ id: owner.id, email: owner.email, role: "owner" });

        await owner.update({ refresh_token: tokens.refreshToken });

        res.status(200).json({
            message: "Login successful",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// logoutOwner,

const logoutOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Owners.findByPk(id);
        if (!owner) return res.status(404).json({ message: "Owner not found" });

        await owner.update({ refresh_token: null });

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

        const owner = await Owners.findOne({ where: { refresh_token: refreshToken } });
        if (!owner) return res.status(403).json({ message: "Invalid refresh token" });

        jwtService.verifyRefreshToken(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Token expired or invalid" });

            const tokens = generateTokens({ id: owner.id, email: owner.email });

            owner.update({ refresh_token: tokens.refreshToken });

            res.status(200).json({
                message: "Token refreshed",
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
        });
    } catch (error) {
        errorHandler(error, res);
    }
};

// sendOtp

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const owner = await Owners.findOne({ where: { email } });
        if (!owner) return res.status(404).json({ message: "Owner not found" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        await Owners.update({ otp }, { where: { id: owner.id } });

        const subject = "Your OTP Code";
        const text = `Your OTP code is: ${otp}. It will expire in 5 minutes.`;

        await mailServise.sendOtpMail(email, subject, text);

        res.status(200).json({ message: "OTP sent to email!" });
        console.log(email)

    } catch (error) {
        errorHandler(error, res);
    }
};


const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const owner = await Clients.findOne({ where: { email } });
        if (!owner) return res.status(404).json({ message: "Client not found" });

        if (owner.otp === String(otp)) {
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
    addNewOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,

    loginOwner,
    logoutOwner,
    refreshToken,
    sendOtp,
    verifyOtp,
}