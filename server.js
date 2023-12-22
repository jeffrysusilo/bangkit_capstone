// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Middleware untuk mendapatkan waktu saat request diterima
app.use((req, res, next) => {
  console.log(`Request received at ${new Date()}`);
  next();
});

// Gunakan rute users
app.use('/api/users', userRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
