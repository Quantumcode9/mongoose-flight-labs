const mongoose = require('mongoose');


//destination
const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BWI', 'CLI'], 
  },
  arrival: {
    type: Date,
  }
});


//flight

const flightSchema = new mongoose.Schema({

  airline: {
    type: String,
    enum: ['Delta', 'Southwest', 'United', 'American', 'International'] 
  },
  airport: {
    type: String,
    enum: ['AUS', 'BWI', 'DEN', 'LAX', 'CLI'], 
    default: 'DEN' 
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1); 
      return date;
    }

  },
   destinations: [destinationSchema]
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
