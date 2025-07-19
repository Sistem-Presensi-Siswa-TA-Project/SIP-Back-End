// routes/presensiMapelRoutes.js
const express = require('express');
const router = express.Router();
const presensiMapelController = require('../controller/presensiMapelController');
const formParser = require('../middleware/formParser');

router.get('/', presensiMapelController.getAllPresensiMapel);
router.get('/:id', presensiMapelController.getPresensiMapelById);
router.get('/:kelas', presensiMapelController.getPresensiMapelByKelas);
router.post('/search-form', presensiMapelController.searchPresensiMapelByForm);
router.post('/', formParser, presensiMapelController.createPresensiMapel);
router.put('/:id', formParser, presensiMapelController.updatePresensiMapel);
router.delete('/:id', presensiMapelController.deletePresensiMapel);

module.exports = router;
