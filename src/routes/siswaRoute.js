const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController');

router.get('/siswa', siswaController.getSiswa);

module.exports = router;
