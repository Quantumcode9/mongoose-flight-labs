// controllers/destinations.js

const Flight = require('../models/flight');
const Destination = require('../models/destination');

exports.addDestination = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    const destination = new Destination({
      airport: req.body.airport,
      arrival: new Date(req.body.arrival)
    });
    await destination.save();
    flight.destinations.push(destination._id);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
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

