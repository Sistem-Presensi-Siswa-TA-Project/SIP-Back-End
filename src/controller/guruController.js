const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// GET semua guru
exports.getAllGuru = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Guru ORDER BY nama ASC');
    res.status(200).json({
      message: 'Berhasil mengambil semua data guru',
      data: rows
    });
  } catch (error) {
    console.error('Gagal mengambil data guru:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data guru',
      error: error.message
    });
  }
};

// GET guru berdasarkan nomor_induk
exports.getGuruByNomorInduk = async (req, res) => {
  const { nomor_induk } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Guru WHERE nomor_induk = ?', [nomor_induk]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Guru dengan nomor induk tersebut tidak ditemukan.'
      });
    }

    res.status(200).json({
      message: 'Berhasil mengambil data guru',
      data: rows[0]
    });
  } catch (error) {
    console.error('Gagal mengambil data guru:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data guru',
      error: error.message
    });
  }
};

// GET guru berdasarkan id
exports.getGuruById = async (req, res) => {
  const { id_guru } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Guru WHERE id_guru = ?', [id_guru]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Guru dengan id tersebut tidak ditemukan.'
      });
    }

    res.status(200).json({
      message: 'Berhasil mengambil data guru',
      data: rows[0]
    });
  } catch (error) {
    console.error('Gagal mengambil data guru:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data guru',
      error: error.message
    });
  }
};

// POST: Tambah guru
exports.createGuru = async (req, res) => {
  const {
    nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, NIK, nomor_hp,
    nomor_induk, mata_pelajaran, jabatan, pendidikan, alamat, kelurahan,
    kecamatan, kabupaten_kota, provinsi, kode_pos, email, rt, rw
  } = req.body;

  if (!nama || !jenis_kelamin || !nomor_induk || !mata_pelajaran || !jabatan) {
    return res.status(400).json({
      message: 'Kolom wajib (nama, jenis_kelamin, nomor_induk, mata_pelajaran, jabatan) harus diisi.'
    });
  }

  const id_guru = 'G-' + nanoid(12);

  try {
     // Cek apakah NISN sudah ada
    const [existing] = await pool.execute(
        "SELECT * FROM Guru WHERE nomor_induk = ?",
        [nomor_induk]
    );
    
    if (existing.length > 0) {
        return res.status(409).json({
            message: 'Guru dengan nomor induk tersebut telah terdaftar!'
        });
    } else {
      const [result] = await pool.execute(
        `INSERT INTO Guru (
          id_guru, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, NIK, nomor_hp,
          nomor_induk, mata_pelajaran, jabatan, pendidikan, alamat, kelurahan, kecamatan,
          kabupaten_kota, provinsi, kode_pos, email, rt, rw
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id_guru, nama, jenis_kelamin, tempat_lahir || null, tanggal_lahir || null, agama || null, NIK || null,
          nomor_hp || null, nomor_induk, mata_pelajaran, jabatan, pendidikan || null,
          alamat || null, kelurahan || null, kecamatan || null, kabupaten_kota || null,
          provinsi || null, kode_pos || null, email || null, rt || null, rw || null
        ]
      );
  
      res.status(201).json({
        message: 'Data guru berhasil ditambahkan',
        id_guru
      });
    }
  } catch (error) {
    console.error('Gagal menambahkan guru:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan data guru',
      error: error.message
    });
  }
};

// PUT: Update guru
exports.updateGuru = async (req, res) => {
  const { id_guru } = req.params;
  const {
    nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, NIK, nomor_hp,
    nomor_induk, mata_pelajaran, jabatan, pendidikan, alamat, kelurahan,
    kecamatan, kabupaten_kota, provinsi, kode_pos, email, rt, rw
  } = req.body;

  try {
    // Ambil data guru lama
    const [rows] = await pool.execute("SELECT * FROM Guru WHERE id_guru = ?", [id_guru]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Guru dengan ID tersebut tidak ditemukan.' });
    }
    const guruLama = rows[0];

    // Jika Nomor Induk berubah, cek keunikan Nomor Induk
    if (nomor_induk && nomor_induk !== guruLama.nomor_induk) {
        const [existing] = await pool.execute(
            "SELECT * FROM Guru WHERE nomor_induk = ?",
            [nomor_induk]
        );
        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Guru dengan NIP tersebut sudah ada.'
            });
        }
    }

    // Lakukan update
    const [result] = await pool.execute(
      `UPDATE Guru SET 
        nama = ?, jenis_kelamin = ?, tempat_lahir = ?, tanggal_lahir = ?, agama = ?, NIK = ?, nomor_hp = ?,
        nomor_induk = ?, mata_pelajaran = ?, jabatan = ?, pendidikan = ?, alamat = ?, kelurahan = ?,
        kecamatan = ?, kabupaten_kota = ?, provinsi = ?, kode_pos = ?, email = ?, rt = ?, rw = ?
       WHERE id_guru = ?`,
      [
        nama, jenis_kelamin, tempat_lahir || null, tanggal_lahir || null, agama || null, NIK || null,
        nomor_hp || null, nomor_induk, mata_pelajaran, jabatan, pendidikan || null,
        alamat || null, kelurahan || null, kecamatan || null, kabupaten_kota || null,
        provinsi || null, kode_pos || null, email || null, rt || null, rw || null,
        id_guru
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Guru dengan ID tersebut tidak ditemukan.'
      });
    }

    res.status(200).json({
      message: 'Data guru berhasil diperbarui',
      id_guru
    });
  } catch (error) {
    console.error('Gagal memperbarui guru:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui data guru',
      error: error.message
    });
  }
};

// DELETE semua guru
exports.deleteAllGuru = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM Guru');
    res.json({
      message: 'Semua guru berhasil dihapus',
      affectedRows: result.affectedRows
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus semua guru', error: err.message });
  }
};

// DELETE guru
exports.deleteGuru = async (req, res) => {
  const { id_guru } = req.params;

  try {
    const [result] = await pool.execute(
      'DELETE FROM Guru WHERE id_guru = ?',
      [id_guru]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Guru tidak ditemukan.'
      });
    }

    res.status(200).json({
      message: 'Data guru berhasil dihapus'
    });
  } catch (error) {
    console.error('Gagal menghapus guru:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus data guru',
      error: error.message
    });
  }
};
