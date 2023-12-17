// routes/destinations.js
const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations');


// list all flights

// list all flights

router.get('new', destinationsController.new);

router.get('/', destinationsController.index);

router.get('/:id', destinationsController.show);

router.post('/', destinationsController.createDestination);

router.delete('/:id', destinationsController.deleteDestination);

router.get('/:id/edit', destinationsController.editDestination);

router.put('/:id', destinationsController.updateDestination);

router.post('/:id/destinations', flightsCtrl.addDestination);

router.post('/flights/:flightId/destinations', destinationsController.addDestinationToFlight);


module.exports = router;


