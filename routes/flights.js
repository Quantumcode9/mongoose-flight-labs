const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');

// list all flights
router.get('/', flightsController.index); 

// add a new flight
router.get('/new', flightsController.new); 

// creation of a flight
router.post('/', flightsController.createFlight); 

module.exports = router;
