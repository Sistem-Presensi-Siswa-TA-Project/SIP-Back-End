const siswaModel = require('../models/siswaModels');

exports.getSiswa = async (req, res) => {
  try {
    const data = await siswaModel.getAllSiswa();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
