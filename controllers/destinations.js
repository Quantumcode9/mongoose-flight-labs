// controllers/destinations.js

const Flight = require('../models/flight');
const Destination = require('../models/destination');

exports.addDestination = async function(req, res) {
  try {
    const flight = await Flight.findOne({ flightNumber: req.params.flightNumber });
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    const destination = new Destination(req.body);
    flight.destinations.push(destination);
    await flight.save();
    res.status(200).send('Destination added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding destination');
  }
};


