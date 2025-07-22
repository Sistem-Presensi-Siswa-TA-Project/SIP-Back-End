const pool = require('../config/databaseConfig');
const {nanoid} = require('nanoid');

// POST: Tambah Jadwal
exports.createJadwal = async (req, res) => {
  let { id_jadwal, id_mapel, nomor_induk_guru, hari, waktu, kelas, tahun_ajaran, semester } = req.body;

  // Generate id_jadwal jika tidak ada
  if (!id_jadwal) {
    id_jadwal = `J-${nanoid(12)}`; 
  }

  if (!id_mapel || !nomor_induk_guru || !hari || !waktu || !kelas || !tahun_ajaran || !semester) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    // Cek apakah id_mapel ada
    const [cekMapel] = await pool.execute('SELECT * FROM Mata_Pelajaran WHERE id_mapel = ?', [id_mapel]);
    if (cekMapel.length === 0) return res.status(404).json({ message: 'Kode mata pelajaran belum terdaftar!' });

    // Cek apakah guru ada
    const [cekGuru] = await pool.execute('SELECT * FROM Guru WHERE nomor_induk = ?', [nomor_induk_guru]);
    if (cekGuru.length === 0) return res.status(404).json({ message: 'Nomor induk guru belum terdaftar!' });

    await pool.execute(
      'INSERT INTO Jadwal (id_jadwal, id_mapel, nomor_induk_guru, hari, waktu, kelas, tahun_ajaran, semester) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id_jadwal, id_mapel, nomor_induk_guru, hari, waktu, kelas, tahun_ajaran, semester]
    );

    res.status(201).json({ message: 'Jadwal berhasil ditambahkan', id_jadwal });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan jadwal', error: err.message });
  }
};

// GET semua jadwal
exports.getAllJadwal = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM Jadwal
      ORDER BY
        CAST(SUBSTRING(kelas, 1, LENGTH(kelas)-1) AS UNSIGNED),
        SUBSTRING(kelas, -1),
        FIELD(hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')
    `);
    
    res.json({ message: 'Data jadwal berhasil diambil', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil jadwal', error: err.message });
  }
};

// GET jadwal by ID
exports.getJadwalById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Jadwal WHERE id_jadwal = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    res.json({ message: 'Jadwal ditemukan', data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil jadwal', error: err.message });
  }
};

// GET jadwal by kelas
exports.getJadwalByKelas = async (req, res) => {
  const { kelas } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Jadwal WHERE kelas = ?', [kelas]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    res.json({ message: 'Jadwal ditemukan', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil jadwal', error: err.message });
  }
};

// GET jadwal by hari & guru
exports.getJadwalByHaridanGuru = async (req, res) => {
  const { hari, guru } = req.params;

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM Jadwal 
        WHERE hari = ? AND nomor_induk_guru = ? 
        ORDER BY
          CAST(SUBSTRING(kelas, 1, LENGTH(kelas)-1) AS UNSIGNED),
          SUBSTRING(kelas, -1)`, 
      [hari, guru]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan', data: [] });
    }

    // Kembalikan semua rows (bukan rows[0])
    res.json({ message: 'Jadwal ditemukan', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil jadwal', error: err.message });
  }
};

// GET jadwal by guru
exports.getJadwalByGuru = async (req, res) => {
  const { guru } = req.params;

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM Jadwal 
        WHERE nomor_induk_guru = ?
        ORDER BY
          CAST(SUBSTRING(kelas, 1, LENGTH(kelas)-1) AS UNSIGNED),
          SUBSTRING(kelas, -1)`, 
      [guru]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    // Kirim seluruh array rows, bukan rows[0]
    res.json({ message: 'Jadwal ditemukan', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil jadwal', error: err.message });
  }
};

// PUT update jadwal
exports.updateJadwal = async (req, res) => {
  const { id } = req.params;
  const { id_mapel, nomor_induk_guru, hari, waktu, kelas, tahun_ajaran, semester } = req.body;

  try {
    // Cek mapel dan guru
    const [cekMapel] = await pool.execute('SELECT id_mapel FROM Mata_Pelajaran WHERE id_mapel = ?', [id_mapel]);
    if (cekMapel.length === 0) return res.status(404).json({ message: 'Kode mata pelajaran belum terdaftar!' });

    const [cekGuru] = await pool.execute('SELECT nomor_induk FROM Guru WHERE nomor_induk = ?', [nomor_induk_guru]);
    if (cekGuru.length === 0) return res.status(404).json({ message: 'Nomor induk guru belum terdaftar!' });

    const [result] = await pool.execute(
      'UPDATE Jadwal SET id_mapel = ?, nomor_induk_guru = ?, hari = ?, waktu = ?, kelas = ?, tahun_ajaran = ?, semester = ? WHERE id_jadwal = ?',
      [id_mapel, nomor_induk_guru, hari, waktu, kelas, tahun_ajaran, semester, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Jadwal tidak ditemukan' });

    res.json({ message: 'Jadwal berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update jadwal', error: err.message });
  }
};

// DELETE semua jadwal
exports.deleteAllJadwal = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM Jadwal');
    res.json({
      message: 'Semua jadwal berhasil dihapus',
      affectedRows: result.affectedRows
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus semua jadwal', error: err.message });
  }
};

// DELETE jadwal
exports.deleteJadwal = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM Jadwal WHERE id_jadwal = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    res.json({ message: 'Jadwal berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus jadwal', error: err.message });
  }
};
