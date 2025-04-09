module.exports = function adminGuard(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: admin not found" });
    }

    if (user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied: admins only" });
    }

    next();
};
