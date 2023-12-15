
const Flight = require('../models/flight');//....
//const Flight = require('../models/flight');

exports.createFlight = async (req, res) => {
  try {
    const newFlight = new Flight({
      airline: 'United',
      airport: 'LAX',
      flightNo: 1234,
      // departs is optional due to default
    });
    await newFlight.save();
    // handle success
  } catch (err) {
    // handle error
  }
};

// controllers/flights.js

exports.index = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.render('flights/index', { flights });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flights');
  }
};


exports.index = async (req, res) => {
  try {
    const flights = await Flight.find();
    
    // Group flights by airline
    const flightsByAirline = flights.reduce((acc, flight) => {
      acc[flight.airline] = acc[flight.airline] || [];
      acc[flight.airline].push(flight);
      return acc;
    }, {});

    res.render('flights/index', { flightsByAirline });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flights');
  }
};


exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    // Now, flights contain all the documents from the database
    // You can send this data back as a response or render a view
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flights');
  }
};



exports.new = (req, res) => {
  res.render('flights/new');
};
exports.createFlight = async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    await newFlight.save();
    res.redirect('/flights');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving the flight');
  }
};

