const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');

// Middleware (jika diperlukan)
// router.use(someMiddleware);

// Route untuk mengambil semua pengguna
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan pengguna' });
  }
});

// Route untuk mengambil pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendapatkan pengguna' });
  }
});

// Route untuk membuat pengguna baru
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'Pengguna baru berhasil dibuat', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal membuat pengguna baru' });
  }
});

// Route untuk mengupdate pengguna berdasarkan ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  try {
    const updatedUser = await User.update({ username, password }, { where: { id: userId } });
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json({ message: 'Pengguna berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui pengguna' });
  }
});

// Route untuk menghapus pengguna berdasarkan ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (!deletedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus pengguna' });
  }
});

module.exports = router;