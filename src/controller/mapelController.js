const pool = require('../config/databaseConfig');

// GET semua mapel
exports.getAllMapel = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Mata_Pelajaran');
    res.json({ message: 'Berhasil ambil data', data: rows });
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil data', error: err.message });
  }
};

// GET mapel by ID
exports.getMapelById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Mata_Pelajaran WHERE id_mapel = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Mapel tidak ditemukan' });
    res.json({ message: 'Data ditemukan', data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Gagal', error: err.message });
  }
};

// POST tambah mapel
exports.createMapel = async (req, res) => {
  const { id_mapel, nama, deskripsi } = req.body;
  if (!id_mapel || !nama) return res.status(400).json({ message: 'ID Mapel dan Nama wajib diisi' });

  try {
    // Cek apakah id mapel sudah ada
    const [existing] = await pool.execute(
        "SELECT * FROM Mapel WHERE id_mapel = ?",
        [id_mapel]
    );
    
    if (existing.length > 0) {
        return res.status(409).json({
            message: 'Mapel dengan ID tersebut sudah ada.'
        });
    } else {
      await pool.execute(
        'INSERT INTO Mata_Pelajaran (id_mapel, nama, deskripsi) VALUES (?, ?, ?)',
        [id_mapel, nama, deskripsi]
      );
      res.status(201).json({ message: 'Mapel berhasil ditambahkan' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah mapel', error: err.message });
  }
};

// PUT update mapel
exports.updateMapel = async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE Mata_Pelajaran SET nama = ?, deskripsi = ? WHERE id_mapel = ?',
      [nama, deskripsi, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Mapel tidak ditemukan' });
    res.json({ message: 'Mapel berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update mapel', error: err.message });
  }
};

// DELETE mapel
exports.deleteMapel = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM Mata_Pelajaran WHERE id_mapel = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Mapel tidak ditemukan' });
    res.json({ message: 'Mapel berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus mapel', error: err.message });
  }
};
