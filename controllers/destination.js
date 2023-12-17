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


exports.addDestinationToFlight = async (req, res) => {
  const { flightId } = req.params; 
  const { airport, arrival } = req.body; 

  try {
    const destination = new Destination({ airport, arrival });
    await destination.save();

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).send('Flight not found');
    }

    flight.destinations.push(destination._id);
    await flight.save();

    res.redirect(`/flights/${flightId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding destination to flight');
  }
};

