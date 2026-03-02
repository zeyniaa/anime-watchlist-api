const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, default: 'Plan to Watch' },
  rating: { type: Number, default: 0 }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Anime', AnimeSchema);