const { errorHandler } = require("../helpers/error_handler")
const Admins = require("../models/admins.model")
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require('config');

const REFRESH_TOKEN_SECRET = config.get("jwt.admin.refresh_key");

const addNewAdmin = async (req, res) => {
    try {
        const { first_name, last_name, email, password, is_creator, refreshToken, is_active } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admins.create({ first_name, last_name, email, password: hashedPassword, is_creator, refreshToken, is_active })
        res.status(201).send({ message: "new admin added", newAdmin })
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admins.findAll();

        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: "admins not found" });
        }

        res.status(200).json({ message: "Here you are", admins });
    } catch (error) {
        console.error("getAllAdmins error:", error);
        errorHandler(error, res);
    }
};

const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admins.findByPk(id);
        res.status(201).send({ message: "here you are", admin })
    } catch (error) {
        errorHandler(error, res)
    }

}

const updateAdmin = async (req, res) => {
    try {
        console.log('req.body:', req.body);
        const { id } = req.params;
        const { first_name, last_name, email, password, is_creator, refreshToken, is_active } = req.body

        const admin = await Admins.update(
            { first_name, last_name, email, password, is_creator, refreshToken, is_active },
            { where: { id }, returning: true }
        );
        res.status(201).json({ admin: admin[1][0] })
    } catch (error) {
        errorHandler(error, res)
    }

}

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admins.destroy({ where: { id } });
        res.status(201).send({ message: "deleted admin", admin })
    } catch (error) {
        errorHandler(error, res)
    }

}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admins.findOne({ where: { email } });
        if (!admin) return res.status(404).json({ message: "Admin not found" });
        console.log("DB password:", admin.password);
        console.log("Input password:", password);
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Password match?", isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const tokens = jwtService.generateTokens({ id: admin.id, email: admin.email, role: "admin", is_creator: admin.is_creator });

        await admin.update({ refreshToken: tokens.refreshToken });

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

//logout Admin

const logoutAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Admins.findByPk(id);
        if (!owner) return res.status(404).json({ message: "Admin not found" });

        await owner.update({ refreshToken: null });

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

        const owner = await Admins.findOne({ where: { refreshToken: refreshToken } });
        if (!owner) return res.status(403).json({ message: "Invalid refresh token" });

        jwtService.verifyRefreshToken(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Token expired or invalid" });

            const tokens = generateTokens({ id: owner.id, email: owner.email });

            owner.update({ refreshToken: tokens.refreshToken });

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

module.exports = {
    addNewAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    logoutAdmin,
    refreshToken,
}