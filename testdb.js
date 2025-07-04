const db = require('./src/config/databaseConfig');

async function testKoneksi() {
  try {
    const [rows] = await db.query('SELECT NOW() AS waktu_server');
    console.log('✅ Koneksi ke database BERHASIL');
    console.log('🕒 Waktu dari server DB:', rows[0].waktu_server);
  } catch (err) {
    console.error('❌ Gagal konek ke database:', err.message);
  }
}

testKoneksi();