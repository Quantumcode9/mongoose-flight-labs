const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: { type: String, required: true },
  arrival: { type: Date, required: true },
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;