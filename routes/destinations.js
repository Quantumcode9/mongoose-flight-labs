// routes/destinations.js
const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations');



// list all flights

router.get('/new', destinationsController.new);

router.get('/', destinationsController.index);

router.get('/:id', destinationsController.show);


router.delete('/:id', destinationsController.deleteDestination);

router.get('/:id/edit', destinationsController.editDestination);

router.put('/:id', destinationsController.updateDestination);

router.post('/', destinationsController.createDestination);

// router.post('/flights/:flightId/destinations', destinationsController.addDestinationToFlight);

router.post('/flights/:flightNumber/destinations', destinationsController.addDestination);


module.exports = router;


