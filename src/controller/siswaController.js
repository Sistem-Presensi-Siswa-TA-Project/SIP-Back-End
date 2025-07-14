const pool = require('../config/databaseConfig');

// GET: Mendapatkan semua siswa (Allsiswa)
exports.getAllSiswa = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id_siswa, nisn, nama, jenis_kelamin, kelas_gabungan FROM Siswa');
        res.status(200).json({
            message: 'Successfully retrieved all students',
            data: rows
        });
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({
            message: 'Failed to retrieve students',
            error: error.message
        });
    }
};

// GET: Mendapatkan siswa berdasarkan NISN dan Kelas
exports.getSiswaByNisnAndKelas = async (req, res) => {
    const {
        nisn,
        kelas
    } = req.params; // Mengambil nisn dan kelas dari parameter URL

    if (!nisn || !kelas) {
        return res.status(400).json({
            message: 'NISN and Kelas are required parameters.'
        });
    }

    try {
        const [rows] = await pool.execute(
            'SELECT id_siswa, nisn, nama, jenis_kelamin, kelas_gabungan FROM Siswa WHERE nisn = ? AND kelas_gabungan = ?',
            [nisn, kelas]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Student not found with the provided NISN and Kelas.'
            });
        }

        res.status(200).json({
            message: 'Successfully retrieved student',
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching student by NISN and Kelas:', error);
        res.status(500).json({
            message: 'Failed to retrieve student',
            error: error.message
        });
    }
};


// POST: Membuat siswa baru (Create Siswa)
exports.createSiswa = async (req, res) => {
    const {
        id_siswa,
        nisn,
        nama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        agama,
        nomor_hp,
        kelas_gabungan
    } = req.body;

    if (!id_siswa || !nisn || !nama || !jenis_kelamin || !kelas_gabungan) {
        return res.status(400).json({
            message: 'Required fields (id_siswa, nisn, nama, jenis_kelamin, kelas_gabungan) must be provided.'
        });
    }

    try {
        const [result] = await pool.execute(
            `INSERT INTO Siswa (id_siswa, nisn, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, nomor_hp, kelas_gabungan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_siswa, nisn, nama, jenis_kelamin, tempat_lahir || null, tanggal_lahir || null, agama || null, nomor_hp || null, kelas_gabungan]
        );
        res.status(201).json({
            message: 'Student created successfully',
            siswaId: result.insertId || id_siswa
        });
    } catch (error) {
        console.error('Error creating student:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Student with this ID or NISN already exists.',
                error: error.message
            });
        }
        res.status(500).json({
            message: 'Failed to create student',
            error: error.message
        });
    }
};

// PUT: Mengupdate siswa berdasarkan id_siswa (Update Siswa)
exports.updateSiswa = async (req, res) => {
    const {
        id_siswa
    } = req.params;
    const {
        nisn,
        nama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        agama,
        nomor_hp,
        kelas_gabungan
    } = req.body;

    if (!nisn && !nama && !jenis_kelamin && !tempat_lahir && !tanggal_lahir && !agama && !nomor_hp && !kelas_gabungan) {
        return res.status(400).json({
            message: 'No fields to update provided.'
        });
    }

    try {
        const [result] = await pool.execute(
            `UPDATE Siswa SET nisn = ?, nama = ?, jenis_kelamin = ?, tempat_lahir = ?, tanggal_lahir = ?, agama = ?, nomor_hp = ?, kelas_gabungan = ? WHERE id_siswa = ?`,
            [nisn, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, nomor_hp, kelas_gabungan, id_siswa]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        res.status(200).json({
            message: 'Student updated successfully',
            id_siswa: id_siswa
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            message: 'Failed to update student',
            error: error.message
        });
    }
};

// DELETE: Menghapus siswa berdasarkan id_siswa (Delete Siswa)
exports.deleteSiswa = async (req, res) => {
    const {
        id_siswa
    } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM Siswa WHERE id_siswa = ?',
            [id_siswa]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Student not found.'
            });
        }

        res.status(200).json({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({
            message: 'Failed to delete student',
            error: error.message
        });
    }
};