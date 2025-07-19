const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

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
