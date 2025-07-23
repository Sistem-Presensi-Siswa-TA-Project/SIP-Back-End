const pool = require('../config/databaseConfig');
const { nanoid } = require('nanoid');

// CREATE
exports.createPresensiPiket = async (req, res) => {
  const {
    nisn,
    tanggal_presensi,
    waktu,
    nama_siswa,
    kelas,
    nomor_induk_piket,
    jenis, // "Presensi Masuk" atau "Presensi Pulang"
  } = req.body;

  // Validasi
  if (!nisn || !tanggal_presensi || !waktu || !nama_siswa || !kelas || !nomor_induk_piket || !jenis) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }
  
  if (jenis !== 'Presensi Masuk' && jenis !== 'Presensi Pulang') {
    return res.status(400).json({ message: 'Jenis presensi tidak valid' });
  }

  try {
    // Cek apakah siswa sudah terdaftar atau belum
    const [siswaRows] = await pool.execute(
      'SELECT * FROM Siswa WHERE nisn = ?',
      [nisn]
    );
    
    if (siswaRows.length === 0) {
      return res.status(404).json({ message: 'Siswa belum terdaftar!' });
    }
    
    // Cari apakah sudah ada data presensi untuk nisn & tanggal tsb
    const [existingRows] = await pool.execute(
      'SELECT * FROM Presensi_Piket WHERE nisn = ? AND tanggal_presensi = ?',
      [nisn, tanggal_presensi]
    );

    if (existingRows.length === 0) {
      // --- INSERT baru ---
      const id_presensipiket = `PP-${nanoid(12)}`;
      let waktu_masuk = null;
      let waktu_pulang = null;
      if (jenis === 'Presensi Masuk') waktu_masuk = waktu;
      if (jenis === 'Presensi Pulang') waktu_pulang = waktu;

      await pool.execute(
        'INSERT INTO Presensi_Piket (id_presensipiket, nisn, tanggal_presensi, waktu_masuk, waktu_pulang, nama_siswa, kelas, nomor_induk_piket) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id_presensipiket, nisn, tanggal_presensi, waktu_masuk, waktu_pulang, nama_siswa, kelas, nomor_induk_piket]
      );
      return res.status(201).json({ message: `Presensi ${jenis === 'Presensi Masuk' ? 'masuk' : 'pulang'} berhasil dicatat`, id_presensipiket });
    } else {
      // --- UPDATE (sudah ada data hari itu) ---
      const presensi = existingRows[0];

      if (jenis === 'Presensi Masuk') {
        if (presensi.waktu_masuk) {
          return res.status(409).json({ message: 'Siswa telah melakukan presensi masuk!' });
        }
        await pool.execute(
          'UPDATE Presensi_Piket SET waktu_masuk = ? WHERE id_presensipiket = ?',
          [waktu, presensi.id_presensipiket]
        );
        return res.status(200).json({ message: 'Presensi masuk berhasil dicatat' });
      } else if (jenis === 'Presensi Pulang') {
        if (presensi.waktu_pulang) {
          return res.status(409).json({ message: 'Siswa telah melakukan presensi pulang!' });
        }
        await pool.execute(
          'UPDATE Presensi_Piket SET waktu_pulang = ? WHERE id_presensipiket = ?',
          [waktu, presensi.id_presensipiket]
        );
        return res.status(200).json({ message: 'Presensi pulang berhasil dicatat' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Gagal tambah/update presensi piket', error: err.message });
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

//Search presensi piket
exports.searchPresensiPiketByForm = async (req, res) => {
  const { tanggal_presensi, nama_siswa, kelas } = req.body;

  if (!tanggal_presensi) {
    return res.status(400).json({ message: 'Tanggal presensi wajib diisi' });
  }

  try {
    let query = `SELECT * FROM Presensi_Piket WHERE tanggal_presensi = ?`;
    const values = [tanggal_presensi];

    if (nama_siswa && nama_siswa.trim() !== '') {
      query += ' AND nama_siswa LIKE ?';
      values.push(`%${nama_siswa}%`);
    }

    if (kelas && kelas.trim() !== '') {
      query += ' AND kelas = ?';
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
