const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// GET semua piket
exports.getAllPiket = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT * FROM Piket
      ORDER BY
        FIELD(status, 'Guru', 'OSIS'),
    `);
    
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

// GET piket by ID
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

// GET piket by kode piket
exports.getPiketByKodePiket = async (req, res) => {
  const { kodePiket } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Piket WHERE kode_piket = ?', [kodePiket]);
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
  const { nomor_induk, kode_piket, status } = req.body;

  if (!nomor_induk || !kode_piket || !status) {
    return res.status(400).json({
      message: 'nomor_induk, kode_piket, dan status wajib diisi'
    });
  }

  try {
    // Cek apakah nomor_induk ada di Guru atau Siswa
    const [guruRows] = await pool.execute(
      'SELECT nomor_induk FROM Guru WHERE nomor_induk = ?',
      [nomor_induk]
    );

    if (guruRows.length === 0) {
      const [siswaRows] = await pool.execute(
        'SELECT nisn FROM Siswa WHERE nisn = ?',
        [nomor_induk]
      );
      
      if (siswaRows.length === 0) {
        return res.status(404).json({ message: 'Nomor Induk tidak ditemukan di Guru maupun Siswa' });
      }
    }

    // Cek apakah kode piket sudah ada
    const [existing] = await pool.execute(
        "SELECT * FROM Piket WHERE kode_piket = ?",
        [kode_piket]
    );
    if (existing.length > 0) {
        return res.status(409).json({
            message: 'Kode piket telah terdaftar.'
        });
    } else {
      const id_piket = 'PK-' + nanoid(12);

      await pool.execute(
        'INSERT INTO Piket (id_piket, nomor_induk, kode_piket, status) VALUES (?, ?, ?, ?)',
        [id_piket, nomor_induk, kode_piket, status]
      );
  
      res.status(201).json({
        message: 'Piket berhasil ditambahkan',
        id_piket
      });
    }
  } catch (error) {
    console.error('Gagal menambahkan piket:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan piket',
      error: error.message
    });
  }
};

// PUT: update piket
exports.updatePiket = async (req, res) => {
  const { id_piket } = req.params;
  const { nomor_induk, kode_piket, status } = req.body;

  if (!nomor_induk || !kode_piket || !status) {
    return res.status(400).json({
      message: 'nomor_induk, kode_piket, dan status wajib diisi'
    });
  }

  try {
    // Ambil data guru lama
    const [rows] = await pool.execute("SELECT * FROM Piket WHERE id_piket = ?", [id_piket]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Piket dengan ID tersebut tidak ditemukan.' });
    }
    const piketLama = rows[0];

    // Jika Nomor Induk berubah, cek keunikan Nomor Induk
    if (kode_piket && kode_piket !== piketLama.kode_piket) {
        const [existing] = await pool.execute(
            "SELECT * FROM Piket WHERE kode_piket = ?",
            [kode_piket]
        );
        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Piket dengan kode tersebut telah terdaftar!'
            });
        }
    }

    // Jika Nomor Induk berubah, cek keunikan Nomor Induk
    if (nomor_induk && nomor_induk !== piketLama.nomor_induk) {
        const [existing] = await pool.execute(
            "SELECT * FROM Piket WHERE nomor_induk = ?",
            [nomor_induk]
        );
        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Piket dengan nomor induk tersebut telah terdaftar!'
            });
        }
    }

    // Lakukan Update
    const [result] = await pool.execute(
      'UPDATE Piket SET nomor_induk = ?, kode_piket = ?, status = ? WHERE id_piket = ?',
      [nomor_induk, kode_piket, status, id_piket]
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
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui piket',
      error: error.message
    });
  }
};

// DELETE: hapus piket
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
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus piket',
      error: error.message
    });
  }
};
