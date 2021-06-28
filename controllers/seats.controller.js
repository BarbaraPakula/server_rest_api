const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const t = await Seat.findOne().skip(rand);
    if (!t) res.status(404).json({ message: 'Not found' });
    else res.json(t);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const s = await Seat.findById(req.params.id);
    if (!s) res.status(404).json({ message: 'Not found' });
    else res.json(s);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const dep = await Seat.findById(req.params.id);
    if (dep) {
      dep.day = day;
      dep.seat = seat;
      dep.client = client;
      dep.email = email;
      await dep.save();
      res.json();
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const s = await Seat.findById(req.params.id);
    if (s) {
      await s.remove();
      res.json(s);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
