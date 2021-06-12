class Manga {
  constructor(data) {
    this.title = data.title;
    this.img = data.image_url;
    this.review = data.url;
    this.startShow = data.start_date;
    this.rate = data.score;
    this.slug = data.title.toLowerCase().split(' ').join('-');
  }
}
module.exports = Manga;
