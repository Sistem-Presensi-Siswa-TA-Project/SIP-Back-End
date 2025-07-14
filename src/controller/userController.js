const pool = require('../config/databaseConfig');

// GET: Mendapatkan semua user (Alluser)
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_user, username, role FROM User');
        res.status(200).json({
            message: 'Sukses menampilkan semua user',
            data: rows
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({
            message: 'Gagal menampilkan semua user',
            error: error.message
        });
    }
};

// POST: Membuat user baru (Create User)
exports.createUser = async (req, res) => {
    const {
        id_user,
        username,
        role,
        fk_id_user, // Anda mungkin perlu mengatur ini berdasarkan logika aplikasi Anda
        fk_id_pik_user
    } = req.body;

    if (!id_user || !username || !role) {
        return res.status(400).json({
            message: 'All required fields (id_user, username, role) must be provided.'
        });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO User (id_user, username, role, fk_id_user, fk_id_pik_user) VALUES (?, ?, ?, ?, ?)',
            [id_user, username, role, fk_id_user || null, fk_id_pik_user || null] // Asumsi nullable untuk FK jika tidak diberikan
        );
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertId || id_user // insertId mungkin tidak relevan jika id_user sudah ditentukan
        });
    } catch (error) {
        console.error('Error creating user:', error);
        // Tangani error jika id_user duplikat atau lainnya
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'User with this ID or username already exists.',
                error: error.message
            });
        }
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message
        });
    }
};

// PUT: Mengupdate user berdasarkan id_user (Update User)
exports.updateUser = async (req, res) => {
    const {
        id_user
    } = req.params; // Mengambil id_user dari parameter URL
    const {
        username,
        role,
        fk_id_user,
        fk_id_pik_user
    } = req.body;

    if (!username && !role && !fk_id_user && !fk_id_pik_user) {
        return res.status(400).json({
            message: 'No fields to update provided.'
        });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE User SET username = ?, role = ?, fk_id_user = ?, fk_id_pik_user = ? WHERE id_user = ?',
            [username, role, fk_id_user || null, fk_id_pik_user || null, id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User updated successfully',
            id_user: id_user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Failed to update user',
            error: error.message
        });
    }
};

// DELETE: Menghapus user berdasarkan id_user (Delete User)
exports.deleteUser = async (req, res) => {
    const {
        id_user
    } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM User WHERE id_user = ?',
            [id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Failed to delete user',
            error: error.message
        });
    }
};