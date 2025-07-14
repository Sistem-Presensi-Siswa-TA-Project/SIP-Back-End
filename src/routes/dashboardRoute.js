const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

// Admin only
router.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses hanya untuk admin' });
  }
  res.json({ message: 'Selamat datang di dashboard admin' });
});

// Guru Matpel only
router.get('/guru-matpel', authenticateToken, (req, res) => {
  if (req.user.role !== 'guru_matpel') {
    return res.status(403).json({ message: 'Akses hanya untuk guru matpel' });
  }
  res.json({ message: 'Selamat datang di dashboard guru matpel' });
});

// Guru Piket only
router.get('/guru-piket', authenticateToken, (req, res) => {
  if (req.user.role !== 'guru_piket') {
    return res.status(403).json({ message: 'Akses hanya untuk guru piket' });
  }
  res.json({ message: 'Selamat datang di dashboard guru piket' });
});

// OSIS only
router.get('/osis', authenticateToken, (req, res) => {
  if (req.user.role !== 'osis') {
    return res.status(403).json({ message: 'Akses hanya untuk OSIS' });
  }
  res.json({ message: 'Selamat datang di dashboard OSIS' });
});

module.exports = router;
