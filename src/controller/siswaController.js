const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// GET semua siswa
exports.getAllSiswa = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Siswa');
        res.status(200).json({
            message: 'Berhasil mengambil semua data siswa',
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil data siswa:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data siswa',
            error: error.message
        });
    }
};

// GET siswa berdasarkan kelas
exports.getSiswaByKelas = async (req, res) => {
    const { kelas } = req.params;

    if (!kelas) {
        return res.status(400).json({
            message: 'Kelas harus disertakan.'
        });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Siswa WHERE kelas = ?',
            [kelas]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Tidak ditemukan siswa dengan kelas tersebut.'
            });
        }

        res.status(200).json({
            message: 'Berhasil mengambil data siswa berdasarkan kelas',
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil data siswa berdasarkan kelas:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data siswa',
            error: error.message
        });
    }
};

// GET siswa berdasarkan NISN
exports.getSiswaByNisn = async (req, res) => {
    const { nisn } = req.params;

    if (!nisn) {
        return res.status(400).json({
            message: 'NISN harus disertakan.'
        });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Siswa WHERE nisn = ?',
            [nisn]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Tidak ditemukan siswa dengan NISN tersebut.'
            });
        }

        res.status(200).json({
            message: 'Berhasil mengambil data siswa berdasarkan NISN',
            data: rows[0]
        });
    } catch (error) {
        console.error('Gagal mengambil data siswa berdasarkan NISN:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data siswa',
            error: error.message
        });
    }
};

// GET siswa berdasarkan id
exports.getSiswaById = async (req, res) => {
    const { idSiswa } = req.params;

    if (!idSiswa) {
        return res.status(400).json({
            message: 'Id Siswa harus disertakan.'
        });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM Siswa WHERE id_siswa = ?',
            [idSiswa]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Tidak ditemukan siswa dengan id tersebut.'
            });
        }

        res.status(200).json({
            message: 'Berhasil mengambil data siswa berdasarkan id',
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil data siswa berdasarkan id:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data siswa',
            error: error.message
        });
    }
};

// POST: Tambah siswa baru
exports.createSiswa = async (req, res) => {
    const {
        nisn,
        nama,
        jenis_kelamin,
        kelas,
        tempat_lahir,
        tanggal_lahir,
        nomor_hp,
        kelas_gabungan
    } = req.body;

    if (!nisn || !nama || !jenis_kelamin || !kelas) {
        return res.status(400).json({
            message: 'Kolom wajib (nisn, nama, jenis_kelamin, kelas) harus diisi.'
        });
    }

    try {
        // Cek apakah NISN sudah ada
        const [existing] = await pool.execute(
            "SELECT * FROM Siswa WHERE nisn = ?",
            [nisn]
        );
        
        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Siswa dengan NISN tersebut sudah ada.'
            });
        } else {
            // Jika belum ada, lakukan insert
            const id_siswa = 'S-' + nanoid(6);
            await pool.execute(
                `INSERT INTO Siswa (
                    id_siswa, nisn, nama, jenis_kelamin, kelas,
                    tempat_lahir, tanggal_lahir, nomor_hp, kelas_gabungan
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id_siswa, nisn, nama, jenis_kelamin, kelas,
                    tempat_lahir || null, tanggal_lahir || null, nomor_hp || null, kelas_gabungan || null
                ]
            );
            res.status(201).json({
                message: 'Data siswa berhasil ditambahkan',
                id_siswa
            });
        }
    } catch (error) {
        console.error('Gagal menambahkan siswa:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat menambahkan siswa',
            error: error.message
        });
    }
};

// PUT: Update siswa berdasarkan ID
exports.updateSiswa = async (req, res) => {
    const { id_siswa } = req.params;
    const {
        nisn,
        nama,
        jenis_kelamin,
        kelas,
        tempat_lahir,
        tanggal_lahir,
        nomor_hp,
        kelas_gabungan
    } = req.body;

    if (!nisn && !nama && !jenis_kelamin && !kelas && !tempat_lahir && !tanggal_lahir && !nomor_hp && !kelas_gabungan) {
        return res.status(400).json({
            message: 'Tidak ada data yang diberikan untuk diperbarui.'
        });
    }

    try {
        const [result] = await pool.execute(
            `UPDATE Siswa SET 
                nisn = ?, nama = ?, jenis_kelamin = ?, kelas = ?,
                tempat_lahir = ?, tanggal_lahir = ?, nomor_hp = ?, kelas_gabungan = ?
             WHERE id_siswa = ?`,
            [
                nisn, nama, jenis_kelamin, kelas,
                tempat_lahir || null, tanggal_lahir || null, nomor_hp || null, 
                kelas_gabungan || null, id_siswa
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Siswa dengan ID tersebut tidak ditemukan.'
            });
        }

        res.status(200).json({
            message: 'Data siswa berhasil diperbarui',
            id_siswa
        });
    } catch (error) {
        console.error('Gagal memperbarui siswa:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat memperbarui data siswa',
            error: error.message
        });
    }
};

// DELETE siswa berdasarkan ID
exports.deleteSiswa = async (req, res) => {
    const { id_siswa } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM Siswa WHERE id_siswa = ?',
            [id_siswa]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Siswa dengan ID tersebut tidak ditemukan.'
            });
        }

        res.status(200).json({
            message: 'Data siswa berhasil dihapus'
        });
    } catch (error) {
        console.error('Gagal menghapus siswa:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus data siswa',
            error: error.message
        });
    }
};
