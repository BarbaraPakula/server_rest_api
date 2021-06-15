const express = require('express');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
// var cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors())

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);


app.use((req, res) => {
  res.status(404).send({
    message: 'Not found...',
    status: 404
  });
})

app.listen(8000, () => {
  console.log('Server listening on port: 8000')
})