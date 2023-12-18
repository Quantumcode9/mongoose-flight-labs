const Flight = require('../models/flight');
const Destination = require('../models/destination');

// This function will list all flights grouped by airline
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
}

// list all flights grouped by airline
exports.getFlights = async function(req, res) {
  try {
    const flights = await Flight.find({});
    const flightsByAirline = flights.reduce((obj, flight) => {
      const airline = flight.airline;
      if (!obj[airline]) {
        obj[airline] = [];
      }
      obj[airline].push(flight);
      return obj;
    }, {});
    res.render('flights/index', { flightsByAirline });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting flights');
  }
};



// ADD a new flight to form
exports.new = (req, res) => {
  res.render('flights/new');
};

// CREATE a new flight and redirect 
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

// ADD a destination to a flight
exports.addDestination = async (req, res) => {
  try {
    // Create a new Destination document
    const destination = new Destination({
      airport: req.body.airport,
      arrival: new Date(req.body.arrival) 
    });
    await destination.save();

    // Find the flight and add the destination's ObjectId
    // 
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send('Flight not found');
    }

    flight.destinations.push(destination._id);
    await flight.save();

    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding destination');
  }
};

// SHOW a flight's details

exports.show = async function(req, res) {
  try {
    const flight = await Flight.findById(req.params.id).populate('destinations').populate('tickets');;
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    res.render('flights/show', { flight: flight });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving flight details');
  }
};

// Add a ticket to a flight
exports.addTicket = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    const newTicket = new Ticket({
      ...req.body,
      flight: flight._id
    });
    await newTicket.save();

    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating ticket');
  }
};