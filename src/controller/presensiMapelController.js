const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// CREATE
exports.createPresensiMapel = async (req, res) => {
  const {
    id_jadwal, nisn, tanggal_presensi, waktu_presensi,
    keterangan, nama_siswa, kelas, nomor_induk_guru
  } = req.body;

  const id_presensi = `PM-${nanoid(12)}`;

  if (!id_jadwal || !nisn || !tanggal_presensi || !waktu_presensi || !keterangan || !nama_siswa || !kelas || !nomor_induk_guru ) {
    return res.status(400).json({ message: 'Field wajib tidak boleh kosong' });
  }

  try {
    // Cek apakah id_jadwal sudah ada atau belum
    const [jadwalCheck] = await pool.execute('SELECT * FROM Jadwal WHERE id_jadwal = ?', [id_jadwal]);
    if (jadwalCheck.length === 0) {
      return res.status(404).json({ message: 'ID Jadwal tidak ditemukan di tabel Jadwal' });
    }

    // Cek apakah nisn valid
    const [siswaCheck] = await pool.execute('SELECT * FROM Siswa WHERE nisn = ?', [nisn]);
    if (siswaCheck.length === 0) {
      return res.status(404).json({ message: 'Siswa dengan NISN ini tidak ditemukan' });
    }

    await pool.execute(
      'INSERT INTO Presensi_Mapel (id_presensi, id_jadwal, nisn, tanggal_presensi, waktu_presensi, keterangan, nama_siswa, kelas, nomor_induk_guru) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id_presensi, id_jadwal, nisn, tanggal_presensi, waktu_presensi, keterangan, nama_siswa, kelas, nomor_induk_guru]
    );
    res.status(201).json({ message: 'Presensi mapel berhasil ditambahkan', id_presensi });
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah presensi mapel', error: err.message });
  }
};

// READ ALL
exports.getAllPresensiMapel = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Presensi_Mapel');
    res.json({ message: 'Berhasil ambil data presensi mapel', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data', error: err.message });
  }
};

// READ BY ID
exports.getPresensiMapelById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Presensi_Mapel WHERE id_presensi = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ message: 'Data ditemukan', data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data', error: err.message });
  }
};

exports.getPresensiMapelByKelas = async (req, res) => {
  const { kelas } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Presensi_Mapel WHERE kelas = ?', [kelas]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `Tidak ada data presensi untuk kelas ${kelas}` });
    }

    res.json({ message: 'Data ditemukan', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data berdasarkan kelas', error: err.message });
  }
};

//Cari presensi 
exports.searchPresensiMapelByForm = async (req, res) => {
  const { tanggal, nama, mapel, kelas } = req.body;

  if (!tanggal) {
    return res.status(400).json({ message: 'Tanggal presensi wajib diisi' });
  }

  try {
    let query = `
      SELECT pm.*, mp.nama AS nama_mapel
      FROM Presensi_Mapel pm
      JOIN Jadwal j ON pm.id_jadwal = j.id_jadwal
      JOIN Mata_Pelajaran mp ON j.id_mapel = mp.id_mapel
      WHERE pm.tanggal_presensi = ?
    `;
    const values = [tanggal];

    if (nama) {
      query += ' AND pm.nama_siswa LIKE ?';
      values.push(`%${nama}%`);
    }

    if (mapel) {
      query += ' AND mp.nama LIKE ?';
      values.push(`%${mapel}%`);
    }

    if (kelas) {
      query += ' AND pm.kelas = ?';
      values.push(kelas);
    }

    const [rows] = await pool.execute(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.json({ message: 'Data ditemukan', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal cari data', error: err.message });
  }
};


// UPDATE
exports.updatePresensiMapel = async (req, res) => {
  const { id } = req.params;
  const {
    id_jadwal, nisn, tanggal_presensi, waktu_presensi,
    keterangan, nama_siswa, kelas, nomor_induk_guru
  } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE Presensi_Mapel SET id_jadwal = ?, nisn = ?, tanggal_presensi = ?, waktu_presensi = ?, keterangan = ?, nama_siswa = ?, kelas = ?, nomor_induk_guru = ? WHERE id_presensi = ?',
      [id_jadwal, nisn, tanggal_presensi, waktu_presensi, keterangan, nama_siswa, kelas, nomor_induk_guru, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ message: 'Presensi mapel berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update data', error: err.message });
  }
};

// DELETE
exports.deletePresensiMapel = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM Presensi_Mapel WHERE id_presensi = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json({ message: 'Presensi mapel berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus data', error: err.message });
  }
};
