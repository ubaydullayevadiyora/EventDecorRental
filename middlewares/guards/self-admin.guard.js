module.exports = function selfAdminGuard(req, res, next) {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.id !== req.params.id && !(user.role === 'admin' || user.is_creator)) {
        return res.status(403).json({ message: "Access denied" });
    }

    next();
};