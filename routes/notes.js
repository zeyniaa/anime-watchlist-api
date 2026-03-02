const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, content } = req.body; 

  if (!title || !content) {
    return res.status(400).json({ error: 'Title dan content wajib diisi!' });
  }

  try {
    const newNote = await Note.create({ title, content });
    
    res.json(newNote); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;