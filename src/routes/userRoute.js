const express = require('express');
const router = express.Router();

const { loginUser } = require('../controller/userController');
const verifyToken = require('../middleware/authMiddleware');
const { allowRole } = require('../middleware/roleMiddleware');

// Route untuk login
router.post('/login', loginUser);

// Route untuk dashboard berdasarkan role
router.get('/admin/dashboard', verifyToken, allowRole('admin'), (req, res) => {
    res.json({ message: `Halo Admin ${req.user.username}` });
});

router.get('/guru/dashboard', verifyToken, allowRole('guru'), (req, res) => {
    res.json({ message: `Halo Guru ${req.user.username}` });
});

router.get('/piket/dashboard', verifyToken, allowRole('piket'), (req, res) => {
    res.json({ message: `Halo Piket ${req.user.username}` });
});

router.get('/osis/dashboard', verifyToken, allowRole('osis'), (req, res) => {
    res.json({ message: `Halo OSIS ${req.user.username}` });
});

module.exports = router;
