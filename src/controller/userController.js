const pool = require('../config/databaseConfig');
<<<<<<< HEAD
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

// GET: Menampilkan semua user
=======

// GET: Mendapatkan semua user (Alluser)
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_user, username, role FROM User');
        res.status(200).json({
<<<<<<< HEAD
            message: 'Berhasil mengambil semua data user',
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil user:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data user',
=======
            message: 'Sukses menampilkan semua user',
            data: rows
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({
            message: 'Gagal menampilkan semua user',
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
// POST: Menambahkan user baru
exports.createUser = async (req, res) => {
    const { username, role } = req.body;

    if (!username || !role) {
        return res.status(400).json({
            message: 'Username dan role wajib diisi.'
        });
    }

    const id_user = 'U-' + nanoid(6); 
    const defaultPassword = '123456';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    try {
        const [result] = await pool.execute(
            'INSERT INTO User (id_user, username, password, role) VALUES (?, ?, ?, ?)',
            [id_user, username, hashedPassword, role]
        );

        res.status(201).json({
            message: 'User berhasil ditambahkan',
            id_user,
            password_default: defaultPassword
        });
    } catch (error) {
        console.error('Gagal menambahkan user:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Username atau ID sudah digunakan.',
=======
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
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
                error: error.message
            });
        }
        res.status(500).json({
<<<<<<< HEAD
            message: 'Terjadi kesalahan saat menambahkan user',
=======
            message: 'Failed to create user',
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
// PUT: Mengupdate user
exports.updateUser = async (req, res) => {
    const { id_user } = req.params;
    const { username, role } = req.body;

    if (!username && !role) {
        return res.status(400).json({
            message: 'Tidak ada data yang diberikan untuk diperbarui.'
=======
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
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
        });
    }

    try {
        const [result] = await pool.execute(
<<<<<<< HEAD
            'UPDATE User SET username = ?, role = ? WHERE id_user = ?',
            [username, role, id_user]
=======
            'UPDATE User SET username = ?, role = ?, fk_id_user = ?, fk_id_pik_user = ? WHERE id_user = ?',
            [username, role, fk_id_user || null, fk_id_pik_user || null, id_user]
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
<<<<<<< HEAD
                message: 'User tidak ditemukan.'
=======
                message: 'User not found.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            });
        }

        res.status(200).json({
<<<<<<< HEAD
            message: 'User berhasil diperbarui',
            id_user
        });
    } catch (error) {
        console.error('Gagal memperbarui user:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat memperbarui user',
=======
            message: 'User updated successfully',
            id_user: id_user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Failed to update user',
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
// DELETE: Hapus user
exports.deleteUser = async (req, res) => {
    const { id_user } = req.params;
=======
// DELETE: Menghapus user berdasarkan id_user (Delete User)
exports.deleteUser = async (req, res) => {
    const {
        id_user
    } = req.params;
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317

    try {
        const [result] = await pool.execute(
            'DELETE FROM User WHERE id_user = ?',
            [id_user]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
<<<<<<< HEAD
                message: 'User tidak ditemukan.'
=======
                message: 'User not found.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            });
        }

        res.status(200).json({
<<<<<<< HEAD
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
=======
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
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
