const Testimonial = require("../models/testimonial.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const t = await Testimonial.findOne().skip(rand);
    if (!t) res.status(404).json({ message: "Not found" });
    else res.json(t);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    if (!t) res.status(404).json({ message: "Not found" });
    else res.json(t);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
    const { author, text } = req.body;
    try {
        const dep = await(Testimonial.findById(req.params.id));
        if(dep) {
          dep.author = author;
          dep.text = text;
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
    const deletedTestimonial = await Testimonial.findById(req.params.id);
    if (deletedTestimonial) {
      await deletedTestimonial.remove();
      res.json(deletedTestimonial);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
