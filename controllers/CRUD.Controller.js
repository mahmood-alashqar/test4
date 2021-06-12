const MangaModel = require('../models/Schema.Model');

async function postManga(req, res) {
  const { title, slug, img, review, rate, startShow } = req.body;
  MangaModel.find({ slug: slug }, (error, data) => {
    if (error) {
      res.send(error);
    }
    else {
      const newManga = new MangaModel({
        title: title,
        slug: slug,
        img: img,
        review: review,
        rate: rate,
        startShow: startShow
      })
      newManga.save();
      res.send('your manga has been saved!!');
    }

  })
}

async function getHisManga(req, res) {
  MangaModel.find({}, (error, data) => {
    res.send(data);
  })
}

async function deleteManga(req, res) {
  MangaModel.remove({ slug: req.params.slug }, (error, data) => {
    if (error) {
      res.send(error);
    }
    else {
      MangaModel.find({}, (error, data) => {
        res.send(data);
      })
    }
  })
}

async function updateManga(req, res) {
  const { title, review } = req.body;
  MangaModel.findOne({ slug: req.params.slug }, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      data.title = title;
      data.review = review;
      data.save().then(() => { MangaModel.find({}, (error, data) => { res.send(data) }) })
    }
  })
}
module.exports = {
  postManga,
  getHisManga,
  deleteManga,
  updateManga
}