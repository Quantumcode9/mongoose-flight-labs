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
exports.getFlights = (req, res) => {
  const flightId = req.params.id;

  Flight.findById(flightId)
    .populate('destinations')
    .exec(function(err, flight) {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving flight');
      } else {
        res.render('flight/show', { flight });
      }
    });
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
    const flight = await Flight.findOne({ flightNumber: req.params.flightNumber });
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


exports.show = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('destinations');
    if (!flight) {
      return res.status(404).send('Flight not found');
    }
    res.render('flights/show', { flight });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving flight details');
  }
};


// //render show veiw 
// exports.show = async (req, res) => {
//   try {
//     const flight = await Flight.findById(req.params.id).populate('destinations');
//     res.render('flights/show', { flight });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving flight details');
//   }
// };



// exports.show = async (req, res) => {
//   try {
//     const flight = await Flight.findById(req.params.id); // Add .populate('destinations') if they are referenced
//     if (!flight) {
//       return res.status(404).send('Flight not found');
//     }
//     res.render('flights/show', { flight });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving flight details');
//   }
// };