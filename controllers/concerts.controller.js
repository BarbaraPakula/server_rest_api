const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
const Workshop = require('../models/workshop.model');
const sanitize = require('mongo-sanitize');


exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const workshops = await Workshop.find();
    const tickets = await Seat.find();

    const allConcerts = [];
    for(let con of concerts){
      const result = workshops.filter(el => el.concertId == con._id);
      const resultTickets = tickets.filter(el => el.day == con.day);
      const freeTickets = 50 - resultTickets.length;
      const output = {concert: con, freeTickets: freeTickets, workshops: result};
      allConcerts.push(output);
    }
    res.json(allConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }

  catch (err)
  {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try
  {
    let cleanPerform = sanitize(req.body.performer);
    let cleanGenre = sanitize(req.body.genre);
    let cleanImage = sanitize(req.body.image);
    const { price, day} = req.body;
    const newConcert = new Concert({ performer: cleanPerform, genre: cleanGenre, price, day, image: cleanImage });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      res.json(concert);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedConcert = await Concert.findById(req.params.id);
    if (deletedConcert) {
      await deletedConcert.remove();
      res.json(deletedConcert);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const performer = await Concert.find({ performer: req.params.performer });
    if (!performer) res.status(404).json({ message: 'Not found' });
    else res.json(performer);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const genre = await Concert.find({ genre: req.params.genre });
    if (!genre) res.status(404).json({ message: 'Not found' });
    else res.json(genre);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const price = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max } })
    if(!price) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(price);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getDay = async (req, res) => {
  try {
    const day = await Concert.find({day: req.params.day});
    if(!day) res.status(404).json({ message: 'Not found' });
    else res.json(day);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
