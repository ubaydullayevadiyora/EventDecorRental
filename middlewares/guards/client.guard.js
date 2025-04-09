module.exports = function clientGuard(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (user.role !== 'client') {
        return res.status(403).json({ message: "Access denied: clients only" });
    }

    next();
};
