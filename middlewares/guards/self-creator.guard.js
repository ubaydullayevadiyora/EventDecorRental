module.exports = function adminGuard(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: admin not found" });
    }

    console.log(!user.is_creator, user.id !== req?.params?.id);

    if (!user.is_creator && user.id !== req?.params?.id) {
        return res.status(403).json({ message: "Access denied" });
    }

    next();
};