const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');


// list all flights
router.get('/', flightsController.index); 

// add a new flight
router.get('/new', flightsController.new); 

// show veiw
router.get('/:id', flightsController.show); 

router.get('/:id/tickets/new', flightsController.newTicketForm);

// Add destination
router.post('/:id/destinations', flightsController.addDestination); 

// creation of a flight
router.post('/', flightsController.createFlight); 

router.post('/:id/destinations', flightsController.addDestination);

router.post('/:flightId/tickets', flightsController.create);




module.exports = router;
