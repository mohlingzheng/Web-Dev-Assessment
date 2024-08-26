const express = require('express');
const CountriesController = require('../controllers/Countries');

const router = express.Router();

router.get('/countries', CountriesController.index);
router.get("/countries/:id", CountriesController.show);

module.exports = router;