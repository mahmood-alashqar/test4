const superagent = require('superagent');
const Manga = require('../models/First.Modeling');
async function getStartingData(req, res) {
  let gotData = [];
  let SuperAPI = `https://api.jikan.moe/v3/top/manga`;
  superagent.get(SuperAPI).then(data => {
    gotData = data.body.top.map(mapingData => { return new Manga(mapingData) })
    res.send(gotData);
  })
}
module.exports = getStartingData;