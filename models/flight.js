const mongoose = require('mongoose');



const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    match: /^[A-F][1-9]\d?$/, 
    required: true
  },
  price: {
    type: Number,
    min: 0, 
    required: true
  },
});

// const Ticket = mongoose.model('Ticket', ticketSchema);


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
    unique: true,
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

  tickets: [ticketSchema],
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }]
});


const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

