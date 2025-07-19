// routes/presensiPiketRoutes.js
const express = require('express');
const router = express.Router();
const presensiPiketController = require('../controller/presensiPiketController');
const formParser = require('../middleware/formParser');

router.get('/', presensiPiketController.getAllPresensiPiket);
router.get('/:id', presensiPiketController.getPresensiPiketById);
router.get('/kelas/:kelas', presensiPiketController.getPresensiPiketByKelas);
router.post('/search-form', presensiPiketController.searchPresensiPiketByForm);
router.post('/', formParser, presensiPiketController.createPresensiPiket);
router.put('/:id', formParser, presensiPiketController.updatePresensiPiket);
router.delete('/:id', presensiPiketController.deletePresensiPiket);

module.exports = router;
