const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const User = require('../models/user');

function getHash(password) {
  return crypto.createHash('sha1').update(password).digest("hex");
}

// REGISTER 
router.post('/join', async (req, res) => { 
  try {
    const { email, name, password } = req.body; 
    const pwHash = getHash(password); 
    
    // Cek apakah email sudah dipakai
    const exists = await User.findOne({ email }); 
    if (exists) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }
    
    // Simpan data user beserta password yang sudah di-hash
    const newUser = await User.create({ email, name, password: pwHash }); 
    res.status(201).json({ message: 'Registrasi berhasil!', data: { email: newUser.email, name: newUser.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN (Masuk Akun)
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login berhasil!', user: req.user });
});

// LOGOUT (Keluar Akun)
router.get('/logout', (req, res) => { 
  req.logout((err) => { 
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Logout berhasil!' });
  });
});

module.exports = router;