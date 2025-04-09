module.exports = function ownerGuard(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: owner not found" });
    }

    if (user.role !== 'owner') {
        return res.status(403).json({ message: "Access denied: owners only" });
    }

    next();
};
