const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 8082;
const DB = process.env.DATABASE_URL;

const getStartingData = require('./controllers/First.Controller');
const CRUD = require('./controllers/CRUD.Controller');

const mongoose = require('mongoose');
mongoose.connect(`${DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.get('/', (req, res) => {
  res.send('IT Working!!');
})
app.get('/manga', getStartingData);


app.post('/manga/mymanga', CRUD.postManga);
app.get('/manga/mymanga', CRUD.getHisManga);
app.delete('/manga/mymanga/:slug', CRUD.deleteManga);
app.put('/manga/mymanga/:slug', CRUD.updateManga);


















app.listen(PORT, () => {
  console.log(`you listen to ${PORT}`);
});