const db = require('../config/databaseConfig');

async function getAllSiswa() {
  const [rows] = await db.query('SELECT * FROM Siswa');
  return rows;
}

module.exports = { getAllSiswa };
