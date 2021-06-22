const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats)
});

router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id])
})

router.route('/seats/').post((req, res) => {
  const obj = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  if (db.seats.some(chosenSeat => (chosenSeat.day == req.body.day && chosenSeat.seat == req.body.seat))) {
    return res.status(404).json({ message: 'This slot is aleady taken' });
  } else {
    db.seats.push(obj);
    req.io.emit('seatsUpdated', db.seats)
    return res.json(db.seats);
  }
});

router.route('/seats/:id').put((req, res) => {
  db.seats.forEach(element => {
    if (element.id == req.params.id) {
      element.day = req.body.day,
        element.seats = req.body.seats,
        element.client = req.body.client,
        element.email = req.body.email
    }
  });
  return res.json({
    message: 'ok'
  });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.forEach(element => {
    if (element.id == req.params.id) {
      const index = db.seats.indexOf(element);
      db.seats.splice(index, 1);
    }
  });
  return res.json({
    message: 'ok'
  });
});

module.exports = router;

