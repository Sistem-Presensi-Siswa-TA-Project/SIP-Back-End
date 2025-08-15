// routes/presensiMapelRoutes.js
const express = require('express');
const router = express.Router();
const presensiMapelController = require('../controller/presensiMapelController');
const formParser = require('../middleware/formParser');

router.get('/', presensiMapelController.getAllPresensiMapel);
router.get('/:id', presensiMapelController.getPresensiMapelById);
router.get('/jadwal/:idJadwal', presensiMapelController.getPresensiMapelByIdJadwal);
router.get('/jadwal/:idJadwal/tanggal/:tanggal', presensiMapelController.getPresensiMapelByJadwalTanggal);
router.get('/kelas/:kelas', presensiMapelController.getPresensiMapelByKelas);
router.post('/search', formParser, presensiMapelController.searchPresensiMapelByForm);
router.post('/', formParser, presensiMapelController.createPresensiMapel);
router.put('/update', formParser, presensiMapelController.updatePresensiMapel);
router.delete('/:id', presensiMapelController.deletePresensiMapel);
router.delete('/jadwal/:id_jadwal/tanggal/:tanggal_presensi', presensiMapelController.deletePresensiMapelByJadwalAndTanggal);

module.exports = router;

