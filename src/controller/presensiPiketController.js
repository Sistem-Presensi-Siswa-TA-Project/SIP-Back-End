const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// CREATE
exports.createPresensiPiket = async (req, res) => {
  console.log('🔥 req.body:', req.body);
  const {
    nisn,
    tanggal_presensi,
    waktu_masuk,
    waktu_pulang,
    nama_siswa,
    kelas,
    nomor_induk_piket
  } = req.body;

  // Validasi semua field wajib
  if (!nisn || !tanggal_presensi || !waktu_masuk || !waktu_pulang || !nama_siswa || !kelas || !nomor_induk_piket) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    // 🔍 Cek apakah sudah absen
    const [existing] = await pool.execute(
      'SELECT * FROM Presensi_Piket WHERE nisn = ? AND tanggal_presensi = ?',
      [nisn, tanggal_presensi]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Siswa dengan NISN ini sudah melakukan presensi pada tanggal tersebut' });
    }

    const id_presensipiket = `PP-${nanoid(12)}`;
    await pool.execute(
      'INSERT INTO Presensi_Piket (id_presensipiket, nisn, tanggal_presensi, waktu_masuk, waktu_pulang, nama_siswa, kelas, nomor_induk_piket) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id_presensipiket, nisn, tanggal_presensi, waktu_masuk, waktu_pulang, nama_siswa, kelas, nomor_induk_piket]
    );
    res.status(201).json({ message: 'Presensi piket berhasil ditambahkan', id_presensipiket });
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah presensi piket', error: err.message });
  }
};

// GET ALL
exports.getAllPresensiPiket = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Presensi_Piket');
    res.json({ message: 'Data presensi piket berhasil diambil', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data', error: err.message });
  }
};

// GET BY ID
exports.getPresensiPiketById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Presensi_Piket WHERE id_presensipiket = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ message: 'Data ditemukan', data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data', error: err.message });
  }
};

// GET BY KELAS
exports.getPresensiPiketByKelas = async (req, res) => {
  const { kelas } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Presensi_Piket WHERE kelas = ?', [kelas]);
    if (rows.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan untuk kelas tersebut' });
    res.json({ message: 'Data ditemukan', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data berdasarkan kelas', error: err.message });
  }
};

// UPDATE
exports.updatePresensiPiket = async (req, res) => {
  const { id } = req.params;
  const {
    nisn,
    tanggal_presensi,
    waktu_masuk,
    waktu_pulang,
    nama_siswa,
    kelas,
    nomor_induk_piket
  } = req.body;

  // Validasi
  if (!nisn || !tanggal_presensi || !waktu_masuk || !waktu_pulang || !nama_siswa || !kelas || !nomor_induk_piket) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE Presensi_Piket SET nisn = ?, tanggal_presensi = ?, waktu_masuk = ?, waktu_pulang = ?, nama_siswa = ?, kelas = ?, nomor_induk_piket = ? WHERE id_presensipiket = ?',
      [nisn, tanggal_presensi, waktu_masuk, waktu_pulang, nama_siswa, kelas, nomor_induk_piket, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json({ message: 'Presensi piket berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update data', error: err.message });
  }
};

// DELETE
exports.deletePresensiPiket = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM Presensi_Piket WHERE id_presensipiket = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ message: 'Presensi piket berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus data', error: err.message });
  }
};
