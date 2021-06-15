const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
});

router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id])
})

router.route('/concerts/').post((req, res) => {
  const obj = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  }
  db.concerts.push(obj);
  return res.json({
    message: 'ok'
  });
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts.forEach(element => {
    if (element.id == req.params.id) {
      element.performer = req.body.performer,
      element.genre = req.body.genre,
      element.price = req.body.price,
      element.day = req.body.day,
      element.image = req.body.image
    }
  });
  return res.json({
    message: 'ok'
  });
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.forEach(element => {
    if (element.id == req.params.id) {
      const index = db.concerts.indexOf(element);
      db.concerts.splice(index, 1);
    }
  });
  return res.json({
    message: 'ok'
  });
});

module.exports = router;

