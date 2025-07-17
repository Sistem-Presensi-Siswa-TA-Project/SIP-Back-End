const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

// GET: Menampilkan semua user
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_user, username, role FROM User');
        res.status(200).json({
            message: 'Berhasil mengambil semua data user',
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil user:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data user',
            error: error.message
        });
    }
};

// GET: Menampilkan user berdasarkan role
exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;

    if (!role) {
        return res.status(400).json({
            message: 'Role harus disertakan dalam parameter.'
        });
    }

    try {
        const [rows] = await pool.execute('SELECT id_user, username, role FROM User WHERE role = ?', [role]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `Tidak ditemukan user dengan role '${role}'`
            });
        }

        res.status(200).json({
            message: `Berhasil mengambil user dengan role '${role}'`,
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil user berdasarkan role:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil user',
            error: error.message
        });
    }
};

// GET: Menampilkan user berdasarkan id
exports.getUserById = async (req, res) => {
    const { id_user } = req.params;

    if (!id_user) {
        return res.status(400).json({
            message: 'Role harus disertakan dalam parameter.'
        });
    }

    try {
        const [rows] = await pool.execute('SELECT id_user, username, role FROM User WHERE id_user = ?', [id_user]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `Tidak ditemukan user dengan id_user '${id_user}'`
            });
        }

        res.status(200).json({
            message: `Berhasil mengambil user dengan id_user '${id_user}'`,
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil user berdasarkan role:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil user',
            error: error.message
        });
    }
};

// POST: Menambahkan user baru
exports.createUser = async (req, res) => {
    const { username, role } = req.body;

    if (!username || !role) {
        return res.status(400).json({
            message: 'Username dan role wajib diisi.'
        });
    }

    const id_user = 'U-' + nanoid(12); 
    const defaultPassword = 'smpbabussalam';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    try {
        // Cek apakah NISN sudah ada
        const [existing] = await pool.execute(
            "SELECT * FROM User WHERE username = ?",
            [username]
        );
        
        if (existing.length > 0) {
            return res.status(409).json({
                message: 'User dengan username tersebut sudah ada.'
            });
        } else {
            const [result] = await pool.execute(
                'INSERT INTO User (id_user, username, password, role) VALUES (?, ?, ?, ?)',
                [id_user, username, hashedPassword, role]
            );
    
            res.status(201).json({
                message: 'User berhasil ditambahkan',
                id_user,
                password_default: defaultPassword
            });
        }
    } catch (error) {
        console.error('Gagal menambahkan user:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Username atau ID sudah digunakan.',
                error: error.message
            });
        }
        res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan user',
            error: error.message
        });
    }
};

// PUT: Mengupdate user
exports.updateUser = async (req, res) => {
    const { id_user } = req.params;
    const { username, role } = req.body;

    if (!username && !role) {
        return res.status(400).json({
            message: 'Tidak ada data yang diberikan untuk diperbarui.'
        });
    }

    try {
        // Ambil data user lama
        const [rows] = await pool.execute("SELECT * FROM User WHERE id_user = ?", [id_user]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User dengan ID tersebut tidak ditemukan.' });
        }
        const userLama = rows[0];
        
        // Jika username berubah, cek keunikan username
        if (username && username !== userLama.username) {
            const [existing] = await pool.execute(
                "SELECT * FROM User WHERE username = ?",
                [username]
            );
            if (existing.length > 0) {
                return res.status(409).json({
                    message: 'User dengan ID tersebut sudah ada.'
                });
            }
        }
        
        // Lakukan update
        const [result] = await pool.execute(
            'UPDATE User SET username = ?, role = ? WHERE id_user = ?',
            [username, role, id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User tidak ditemukan.'
            });
        }

        res.status(200).json({
            message: 'User berhasil diperbarui',
            id_user
        });
    } catch (error) {
        console.error('Gagal memperbarui user:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat memperbarui user',
            error: error.message
        });
    }
};

// PUT: Reset Password
exports.resetPassword = async (req, res) => {
    const { id_user } = req.params;
    
    const defaultPassword = 'smpbabussalam';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    try {        
        // Lakukan update
        const [result] = await pool.execute(
            'UPDATE User SET password = ? WHERE id_user = ?',
            [hashedPassword, id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User tidak ditemukan.'
            });
        }

        res.status(200).json({
            message: 'Password telah direset ke default "smpbabussalam"!',
            id_user,
            password_default: defaultPassword
        });
    } catch (error) {
        console.error('Gagal memperbarui user:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat memperbarui user',
            error: error.message
        });
    }
};

// DELETE: Hapus user
exports.deleteUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM User WHERE id_user = ?',
            [id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User tidak ditemukan.'
            });
        }

        res.status(200).json({
            message: 'User berhasil dihapus'
        });
    } catch (error) {
        console.error('Gagal menghapus user:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus user',
            error: error.message
        });
    }
};
