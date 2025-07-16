const express = require('express');
const router = express.Router();
const piketController = require('../controller/piketController');
const formParser = require('../middleware/formParser'); // jika pakai form-data

router.get('/', piketController.getAllPiket);
router.get('/:id_piket', piketController.getPiketById);
router.post('/', formParser, piketController.createPiket);
router.put('/:id_piket', formParser, piketController.updatePiket);
router.delete('/:id_piket', piketController.deletePiket);

module.exports = router;
