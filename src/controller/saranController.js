const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// GET semua saran
exports.getAllSaran = async (req, res) => {
    try {
        const [rows] = await pool.execute(`SELECT * FROM Saran`);
        res.status(200).json({
            message: 'Berhasil mengambil semua data saran',
            data: rows
        });
    } catch (error) {
        console.error('Gagal mengambil data siswa:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil data saran',
            error: error.message
        });
    }
};

// CREATE
exports.createSaran = async (req, res) => {
  const { username, nama, email, subjek, pesan } = req.body;
  const id_saran = `SR-${nanoid(12)}`;

  // Validasi semua field wajib
  if (!username || !nama || !email || !subjek || !pesan) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    await pool.execute(
      'INSERT INTO Saran (id_saran, username, nama, email, subjek, pesan) VALUES (?, ?, ?, ?, ?, ?)',
      [id_saran, username, nama, email, subjek, pesan]
    );
    res.status(201).json({ message: 'Saran berhasil dikirim', id_saran });
  } catch (err) {
    res.status(500).json({ message: 'Gagal kirim saran', error: err.message });
  }
};
