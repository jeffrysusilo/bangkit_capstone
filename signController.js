const  Sign  = require('../models/Sign');

const getAllSigns = async (req, res) => {
  try {
    // Ambil semua data  dari database
    const signs = await Sign.findAll();

    res.status(200).json(signs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan data ' });
  }
};

const getSignById = async (req, res) => {
  try {
    const signId = req.params.signId;

    // Cari  berdasarkan ID
    const sign = await Sign.findByPk(signId);

    if (!sign) {
      return res.status(404).json({ message: 'data tidak ditemukan' });
    }

    res.status(200).json(sign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan data ' });
  }
};

const addSign = async (req, res) => {
  try {
    const { name } = req.body;

    // Tambahkan  baru ke database
    const newSign = await Sign.create({ name });

    res.status(201).json({ message: 'data berhasil ditambahkan', sign: newSign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambahkan ' });
  }
};

const updateSign = async (req, res) => {
  try {
    const signId = req.params.signId;
    const { name } = req.body;

    // Perbarui data  di database
    const updatedSign = await Sign.update({ name }, { where: { id: signId } });

    if (updatedSign[0] === 0) {
      return res.status(404).json({ message: 'data tidak ditemukan' });
    }

    res.status(200).json({ message: 'data berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui ' });
  }
};

const deleteSign = async (req, res) => {
  try {
    const signId = req.params.signId;

    // Hapus data  dari database
    const deletedSign = await Sign.destroy({ where: { id: signId } });

    if (!deletedSign) {
      return res.status(404).json({ message: 'data tidak ditemukan' });
    }

    res.status(200).json({ message: 'data berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus ' });
  }
};

module.exports = {
  getAllSigns,
  getSignById,
  addSign,
  updateSign,
  deleteSign,
};