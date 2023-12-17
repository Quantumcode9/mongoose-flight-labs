const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
  },
  arrival: Date
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;