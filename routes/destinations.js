// routes/destinations.js
const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations');


router.post('/flights/:flightNumber/destinations', destinationsController.addDestination);


module.exports = router;


