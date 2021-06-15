const express = require('express');
// var cors = require('cors')
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors())

const db = [
  { id: 0, author: 'John Doe', text: 'What doesn’t kill you will make you stronger.' },
  { id: 1, author: 'Amanda Doe', text: 'Forgive your enemies, but never forget their names.' },
  { id: 2, author: 'Lola Fine', text: 'Obstacles are those frightful things you see when you take your eyes off your goal.' },
  { id: 3, author: 'James Kilbane', text: 'If you are going through hell, keep going.' },
];


app.get('/testimonials', (req, res) => {
  res.json(db)
  console.log(req.params)
})
// zwracamy losowy element z tablicy.
app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id])
})

//dodajemy nowy element do tablicy. Możesz założyć, że body przekazywane przez klienta będzie obiektem z dwoma atrybutami author i text. Id dodawanego elementu musisz losować.

app.post('/testimonials/', (req, res) => {
  const obj = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  }
  db.push(obj);
  return res.json({
    message: 'ok'
  });
});


//modyfikujemy atrybuty author i text elementu tablicy o pasującym :id. Załóż, że body otrzymane w requeście będzie obiektem z atrybutami author i text.

app.put('/testimonials/:id', (req, res) => {
  db.forEach(element => {
    if (element.id == req.params.id) {
      element.author = req.body.author;
      element.text = req.body.text;
    }
  });
  return res.json({
    message: 'ok'
  });
});


//– usuwamy z tablicy wpis o podanym id.
app.delete('/testimonials/:id', (req, res) => {
  db.forEach(element => {
    if (element.id == req.params.id) {
      const index = db.indexOf(element);
      db.splice(index, 1);
    }
  });
  return res.json({
    message: 'ok'
  });
});


app.use((req, res) => {
  res.status(404).send({
    message: 'Not found...',
    status: 404
  });
})

app.listen(8000, () => {
  console.log('Server listening on port: 8000')
})