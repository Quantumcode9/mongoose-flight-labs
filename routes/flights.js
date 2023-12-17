const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');

// list all flights
router.get('/', flightsController.index); 

// add a new flight
router.get('/new', flightsController.new); 

// show veiw
router.get('/:id', flightsController.show); 

router.get('/flights/:flightNumber', flightsController.show);

// Add destination
// router.post('/:id/destinations', flightsController.addDestination); 

router.post('/flights/:flightNumber/destinations', flightsController.addDestination);

// creation of a flight
router.post('/', flightsController.createFlight); 

router.post('/:id/destinations', flightsController.addDestination);





module.exports = router;
