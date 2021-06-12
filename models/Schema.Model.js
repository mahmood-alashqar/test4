const mongoose = require('mongoose');

const MangaSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  slug: {
    unique: true,
    type: String,
    lowercase: true,
    trim: true
  },
  img: String,
  review: String,
  rate: Number,
  startShow: String
});
const MangaModel = new mongoose.model('mangaCollection', MangaSchema);
module.exports = MangaModel;