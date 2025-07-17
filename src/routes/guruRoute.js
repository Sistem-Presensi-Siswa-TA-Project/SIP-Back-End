const express = require('express');
const router = express.Router();
const guruController = require('../controller/guruController');
const formParser = require('../middleware/formParser');

router.get('/', guruController.getAllGuru);
router.get('/nomor-induk/:nomor_induk', guruController.getGuruByNomorInduk);
router.get('/id-guru/:id_guru', guruController.getGuruById);
router.post('/', formParser, guruController.createGuru);
router.put('/:id_guru', guruController.updateGuru);
router.delete('/:id_guru', guruController.deleteGuru);

module.exports = router;
