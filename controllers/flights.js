const Flight = require('../models/flight');

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
//destination 
exports.addDestination = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body); 
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding destination');
  }
};


//render show veiw 
exports.show = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('destinations');
    res.render('flights/show', { flight });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flight details');
  }
};


