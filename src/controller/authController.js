const db = require('../config/databaseConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM User WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Username tidak ditemukan' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      {
        id_user: user.id_user,
        role: user.role,
        id_piket: user.id_piket,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    let dashboard;
    switch (user.role) {
      case 'admin':
        dashboard = '/dashboard/admin';
        break;
      case 'guru_matpel':
        dashboard = '/dashboard/guru-matpel';
        break;
      case 'guru_piket':
        dashboard = '/dashboard/guru-piket';
        break;
      case 'osis':
        dashboard = '/dashboard/osis';
        break;
      default:
        dashboard = '/dashboard';
    }

    res.status(200).json({
      message: 'Login berhasil',
      token,
      role: user.role,
      redirect: dashboard,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
