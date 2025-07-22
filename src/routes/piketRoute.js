const express = require('express');
const router = express.Router();
const piketController = require('../controller/piketController');
const formParser = require('../middleware/formParser');

router.get('/', piketController.getAllPiket);
router.get('/:id_piket', piketController.getPiketById);
router.get('/kode/:kodePiket', piketController.getPiketByKodePiket);
router.post('/', formParser, piketController.createPiket);
router.put('/:id_piket', formParser, piketController.updatePiket);
router.delete('/', piketController.deleteAllPiket);
router.delete('/:id_piket', piketController.deletePiket);

module.exports = router;
