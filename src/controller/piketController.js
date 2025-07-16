const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// GET semua data piket
exports.getAllPiket = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Piket');
    res.status(200).json({
      message: 'Berhasil mengambil semua data piket',
      data: rows
    });
  } catch (error) {
    console.error('Gagal mengambil data piket:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data piket',
      error: error.message
    });
  }
};

// GET piket berdasarkan id_piket
exports.getPiketById = async (req, res) => {
  const { id_piket } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Piket WHERE id_piket = ?', [id_piket]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Piket tidak ditemukan' });
    }
    res.status(200).json({ message: 'Berhasil mengambil data piket', data: rows[0] });
  } catch (error) {
    console.error('Error get piket by id:', error);
    res.status(500).json({ message: 'Gagal mengambil data piket', error: error.message });
  }
};

// POST tambah data piket
exports.createPiket = async (req, res) => {
  const { identitas, status, kode_piket } = req.body;

  if (!identitas || !status || !kode_piket) {
    return res.status(400).json({ message: 'NIP/NISN, status, dan kode_piket wajib diisi' });
  }

  const id_piket = 'PK_' + nanoid(6);
  let id_user;

  try {
    // Cek apakah user dengan role dan identitas (nisn atau nip) tersedia
    const [result] = await pool.execute(
      'SELECT id_user FROM User WHERE username = ? AND role = ?',
      [identitas, status]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: `User dengan role ${status} dan identitas tersebut tidak ditemukan` });
    }

    id_user = result[0].id_user;

    // Insert ke tabel Piket
    await pool.execute(
      'INSERT INTO Piket (id_piket, id_user, kode_piket, status) VALUES (?, ?, ?, ?)',
      [id_piket, id_user, kode_piket, status]
    );

    res.status(201).json({
      message: 'Data piket berhasil ditambahkan',
      id_piket
    });

  } catch (error) {
    console.error('Gagal menambahkan piket:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan piket',
      error: error.message
    });
  }
};

// PUT update data piket
exports.updatePiket = async (req, res) => {
  const { id_piket } = req.params;
  const { identitas, status, kode_piket } = req.body;

  try {
    const [resultUser] = await pool.execute(
      'SELECT id_user FROM User WHERE username = ? AND role = ?',
      [identitas, status]
    );

    if (resultUser.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan berdasarkan identitas dan status' });
    }

    const id_user = resultUser[0].id_user;

    const [result] = await pool.execute(
      'UPDATE Piket SET id_user = ?, kode_piket = ?, status = ? WHERE id_piket = ?',
      [id_user, kode_piket, status, id_piket]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data piket tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Data piket berhasil diperbarui',
      id_piket
    });

  } catch (error) {
    console.error('Gagal update piket:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui piket',
      error: error.message
    });
  }
};

// DELETE hapus data piket
exports.deletePiket = async (req, res) => {
  const { id_piket } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM Piket WHERE id_piket = ?', [id_piket]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Piket tidak ditemukan' });
    }

    res.status(200).json({ message: 'Piket berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus piket:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus piket', error: error.message });
  }
};
