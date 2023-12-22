const express = require('express');
const router = express.Router();
const signController = require('../controllers/signController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware untuk memeriksa apakah pengguna telah login
router.use(authMiddleware.checkAuth);

// Route untuk mendapatkan semua data
router.get('/', signController.getAllSigns);

// Route untuk mendapatkan detail data
router.get('/:signId', signController.getSignById);

// Route untuk menambahkan data baru
router.post('/', signController.addSign);

// Route untuk mengupdate data
router.put('/:signId', signController.updateSign);

// Route untuk menghapus data
router.delete('/:signId', signController.deleteSign);

module.exports = router;