// src/middleware/formParser.js
const multer = require('multer');
const upload = multer();

module.exports = upload.none(); // untuk form-data tanpa file
