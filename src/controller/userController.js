const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../models/userModels');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'Username tidak ditemukan' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password salah' });
        }

        const token = jwt.sign(
            {
                id_user: user.id_user,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login berhasil',
            token,
            role: user.role,
            id_user: user.id_user,
        });

    } catch (error) {
        res.status(500).json({ message: 'Login gagal', error: error.message });
    }
};

module.exports = {
    loginUser,
};
