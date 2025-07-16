const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// GET semua piket
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

// GET piket by id
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

// POST: tambah piket
exports.createPiket = async (req, res) => {
  const { identitas, kode_piket } = req.body;

  if (!identitas || !kode_piket) {
    return res.status(400).json({ message: 'NIP/NISN dan kode_piket wajib diisi' });
  }

  let id_user;
  let status;

  try {
    // Cek di Guru (NIP)
    const [guruRows] = await pool.execute(
      'SELECT nomor_induk FROM Guru WHERE nomor_induk = ?',
      [identitas]
    );

    if (guruRows.length > 0) {
      // Cek user dengan username = NIP
      const [userRows] = await pool.execute(
        'SELECT id_user FROM User WHERE username = ?',
        [identitas]
      );
      if (userRows.length === 0) {
        return res.status(404).json({ message: 'User guru dengan identitas tersebut tidak ditemukan' });
      }
      id_user = userRows[0].id_user;
      status = 'guru';
    } else {
      // Cek di Siswa (NISN)
      const [siswaRows] = await pool.execute(
        'SELECT nisn FROM Siswa WHERE nisn = ?',
        [identitas]
      );

      if (siswaRows.length === 0) {
        return res.status(404).json({ message: 'Identitas tidak ditemukan di Guru maupun Siswa' });
      }

      const [userRows] = await pool.execute(
        'SELECT id_user FROM User WHERE username = ?',
        [identitas]
      );

      if (userRows.length === 0) {
        return res.status(404).json({ message: 'User siswa dengan identitas tersebut tidak ditemukan' });
      }

      id_user = userRows[0].id_user;
      status = 'osis';
    }

    const id_piket = 'PK_' + nanoid(6);

    const [insertResult] = await pool.execute(
      'INSERT INTO Piket (id_piket, id_user, kode_piket, status) VALUES (?, ?, ?, ?)',
      [id_piket, id_user, kode_piket, status]
    );

    res.status(201).json({
      message: 'Piket berhasil ditambahkan',
      id_piket
    });

  } catch (error) {
    console.error('Gagal menambahkan piket:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan piket', error: error.message });
  }
};

// PUT: update piket
exports.updatePiket = async (req, res) => {
  const { id_piket } = req.params;
  const { id_user, kode_piket, status } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE Piket SET id_user = ?, kode_piket = ?, status = ? WHERE id_piket = ?',
      [id_user, kode_piket, status, id_piket]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Piket tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Data piket berhasil diperbarui',
      id_piket
    });
  } catch (error) {
    console.error('Gagal update piket:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui piket', error: error.message });
  }
};

// DELETE piket
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
