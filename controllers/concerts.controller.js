const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const t = await Concert.findOne().skip(rand);
        if (!t) res.status(404).json({ message: 'Not found' });
        else res.json(t);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};


exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.post = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const newConcert = new Concert({ performer, genre, price, day, image });
        await newConcert.save();
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.put = async (req, res) => {
    const { performer, genre, price, day, image} = req.body;
    try {
        const dep = await(Concert.findById(req.params.id));
        if(dep) {
         dep.performer = performer;
         dep. genre = genre;
         dep.price = price;
         dep.day = day;
         dep.image = image;
          await dep.save();
          res.json(dep);
        }
        else res.status(404).json({ message: 'Not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    };

exports.delete = async (req, res) => {
    try {
        const con = await (Concert.findById(req.params.id));
        if (con) {
            await con.remove();
            res.json(con);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

