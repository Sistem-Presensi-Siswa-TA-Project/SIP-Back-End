const pool = require('../config/databaseConfig');
<<<<<<< HEAD
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
=======

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
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
// GET siswa berdasarkan kelas
exports.getSiswaByKelas = async (req, res) => {
    const { kelas } = req.params;

    if (!kelas) {
        return res.status(400).json({
            message: 'Kelas harus disertakan.'
=======
// GET: Mendapatkan siswa berdasarkan NISN dan Kelas
exports.getSiswaByNisnAndKelas = async (req, res) => {
    const {
        nisn,
        kelas
    } = req.params; // Mengambil nisn dan kelas dari parameter URL

    if (!nisn || !kelas) {
        return res.status(400).json({
            message: 'NISN and Kelas are required parameters.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
        });
    }

    try {
        const [rows] = await pool.execute(
<<<<<<< HEAD
            'SELECT * FROM Siswa WHERE kelas = ?',
            [kelas]
=======
            'SELECT id_siswa, nisn, nama, jenis_kelamin, kelas_gabungan FROM Siswa WHERE nisn = ? AND kelas_gabungan = ?',
            [nisn, kelas]
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
        );

        if (rows.length === 0) {
            return res.status(404).json({
<<<<<<< HEAD
                message: 'Tidak ditemukan siswa dengan kelas tersebut.'
=======
                message: 'Student not found with the provided NISN and Kelas.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            });
        }

        res.status(200).json({
<<<<<<< HEAD
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
=======
            message: 'Successfully retrieved student',
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching student by NISN and Kelas:', error);
        res.status(500).json({
            message: 'Failed to retrieve student',
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
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
        asal_sekolah,
        alamat,
        kelurahan,
        kecamatan,
        kabupaten_kota,
        provinsi,
        kode_pos,
        kelas_gabungan
    } = req.body;

    if (!nisn || !nama || !jenis_kelamin || !kelas_gabungan) {
        return res.status(400).json({
            message: 'Kolom wajib (nisn, nama, jenis_kelamin, kelas_gabungan) harus diisi.'
        });
    }

    const id_siswa = 'S-' + nanoid(6);

    try {
        const [result] = await pool.execute(
            `INSERT INTO Siswa (
                id_siswa, nisn, nama, jenis_kelamin, kelas,
                tempat_lahir, tanggal_lahir, nomor_hp,
                asal_sekolah, alamat, kelurahan, kecamatan,
                kabupaten_kota, provinsi, kode_pos, kelas_gabungan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_siswa, nisn, nama, jenis_kelamin, kelas || null,
                tempat_lahir || null, tanggal_lahir || null, nomor_hp || null,
                asal_sekolah || null, alamat || null, kelurahan || null, kecamatan || null,
                kabupaten_kota || null, provinsi || null, kode_pos || null, kelas_gabungan
            ]
        );
        res.status(201).json({
            message: 'Data siswa berhasil ditambahkan',
            id_siswa
        });
    } catch (error) {
        console.error('Gagal menambahkan siswa:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Siswa dengan NISN tersebut sudah ada.',
=======

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
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
                error: error.message
            });
        }
        res.status(500).json({
<<<<<<< HEAD
            message: 'Terjadi kesalahan saat menambahkan siswa',
=======
            message: 'Failed to create student',
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
// PUT: Update siswa berdasarkan ID
exports.updateSiswa = async (req, res) => {
    const { id_siswa } = req.params;
=======
// PUT: Mengupdate siswa berdasarkan id_siswa (Update Siswa)
exports.updateSiswa = async (req, res) => {
    const {
        id_siswa
    } = req.params;
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
    const {
        nisn,
        nama,
        jenis_kelamin,
<<<<<<< HEAD
        kelas,
        tempat_lahir,
        tanggal_lahir,
        nomor_hp,
        asal_sekolah,
        alamat,
        kelurahan,
        kecamatan,
        kabupaten_kota,
        provinsi,
        kode_pos,
        kelas_gabungan
    } = req.body;

    if (!nisn && !nama && !jenis_kelamin && !kelas && !tempat_lahir && !tanggal_lahir && !nomor_hp &&
        !asal_sekolah && !alamat && !kelurahan && !kecamatan && !kabupaten_kota && !provinsi && !kode_pos && !kelas_gabungan) {
        return res.status(400).json({
            message: 'Tidak ada data yang diberikan untuk diperbarui.'
=======
        tempat_lahir,
        tanggal_lahir,
        agama,
        nomor_hp,
        kelas_gabungan
    } = req.body;

    if (!nisn && !nama && !jenis_kelamin && !tempat_lahir && !tanggal_lahir && !agama && !nomor_hp && !kelas_gabungan) {
        return res.status(400).json({
            message: 'No fields to update provided.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
        });
    }

    try {
        const [result] = await pool.execute(
<<<<<<< HEAD
            `UPDATE Siswa SET 
                nisn = ?, nama = ?, jenis_kelamin = ?, kelas = ?,
                tempat_lahir = ?, tanggal_lahir = ?, nomor_hp = ?,
                asal_sekolah = ?, alamat = ?, kelurahan = ?, kecamatan = ?,
                kabupaten_kota = ?, provinsi = ?, kode_pos = ?, kelas_gabungan = ?
             WHERE id_siswa = ?`,
            [
                nisn, nama, jenis_kelamin, kelas || null,
                tempat_lahir || null, tanggal_lahir || null, nomor_hp || null,
                asal_sekolah || null, alamat || null, kelurahan || null, kecamatan || null,
                kabupaten_kota || null, provinsi || null, kode_pos || null, kelas_gabungan || null,
                id_siswa
            ]
=======
            `UPDATE Siswa SET nisn = ?, nama = ?, jenis_kelamin = ?, tempat_lahir = ?, tanggal_lahir = ?, agama = ?, nomor_hp = ?, kelas_gabungan = ? WHERE id_siswa = ?`,
            [nisn, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, nomor_hp, kelas_gabungan, id_siswa]
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
<<<<<<< HEAD
                message: 'Siswa dengan ID tersebut tidak ditemukan.'
=======
                message: 'Student not found.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            });
        }

        res.status(200).json({
<<<<<<< HEAD
            message: 'Data siswa berhasil diperbarui',
            id_siswa
        });
    } catch (error) {
        console.error('Gagal memperbarui siswa:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat memperbarui data siswa',
=======
            message: 'Student updated successfully',
            id_siswa: id_siswa
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            message: 'Failed to update student',
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            error: error.message
        });
    }
};

<<<<<<< HEAD
// DELETE siswa berdasarkan ID
exports.deleteSiswa = async (req, res) => {
    const { id_siswa } = req.params;
=======
// DELETE: Menghapus siswa berdasarkan id_siswa (Delete Siswa)
exports.deleteSiswa = async (req, res) => {
    const {
        id_siswa
    } = req.params;
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317

    try {
        const [result] = await pool.execute(
            'DELETE FROM Siswa WHERE id_siswa = ?',
            [id_siswa]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
<<<<<<< HEAD
                message: 'Siswa dengan ID tersebut tidak ditemukan.'
=======
                message: 'Student not found.'
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
            });
        }

        res.status(200).json({
<<<<<<< HEAD
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
=======
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
>>>>>>> d19e81286ea10feace4256f98044584aa5c41317
