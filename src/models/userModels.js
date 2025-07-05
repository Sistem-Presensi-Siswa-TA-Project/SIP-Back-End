const dbpool = require('../config/databaseConfig');

const getUserByUsername = async (username) => {
    const [result] = await dbpool.execute(`SELECT * FROM user WHERE username = ?`, [username]);
    return result[0]; // hanya ambil 1
};

module.exports = {
    getUserByUsername,
};
