const allowRole = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: `Akses ditolak. Role '${userRole}' tidak diizinkan.` });
        }

        next();
    };
};

module.exports = {
    allowRole
};
