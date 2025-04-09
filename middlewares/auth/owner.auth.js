// middlewares/auth.middleware.js
const jwtService = require("../../services/jwt.service");

module.exports = function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Malformed token" });

    jwtService.verifyAccessToken(token, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Invalid or expired token" });
        console.log(decoded);

        req.user = decoded; // { id, email, iat, exp }
        next();
    });
};
