// routes/animes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anime = require('../models/anime');

// CREATE: Menambah data baru
router.post('/', async (req, res) => {
  const { title, status, rating } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Error: Judul anime wajib diisi!' });
  }
  try {
    const newAnime = await Anime.create({ title, status, rating });
    res.status(201).json({ message: 'Anime berhasil ditambahkan', data: newAnime });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: err.message });
  }
});

// READ ALL: Melihat semua data
router.get('/', async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json({ message: 'Berhasil mengambil semua data', data: animes });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: err.message });
  }
});

// READ BY ID: Melihat satu data spesifik
router.get('/:id', async (req, res) => {
  try {
    // Error Handler: Cek apakah format ID valid
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Format ID tidak valid!' });
    }
    
    const anime = await Anime.findById(req.params.id);
    // Error Handler: Jika data tidak ditemukan di database
    if (!anime) return res.status(404).json({ message: 'Anime tidak ditemukan!' });
    
    res.json({ message: 'Data ditemukan', data: anime });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

// UPDATE: Mengubah data
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Format ID tidak valid!' });
    }

    const updatedAnime = await Anime.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedAnime) return res.status(404).json({ message: 'Anime tidak ditemukan untuk diupdate!' });
    res.json({ message: 'Data berhasil diupdate', data: updatedAnime });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

// 5. Menghapus data
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Format ID tidak valid!' });
    }

    const deletedAnime = await Anime.findByIdAndDelete(req.params.id);
    if (!deletedAnime) return res.status(404).json({ message: 'Anime tidak ditemukan untuk dihapus!' });
    
    res.json({ message: 'Data berhasil dihapus', data: deletedAnime });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
});

module.exports = router;