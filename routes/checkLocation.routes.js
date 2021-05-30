'use strict';

const express = require('express');
const maxmind = require('maxmind');
const router = express.Router();
const checkLocationHelper = require('../helpers/checkLocationHelper');
const config = require('../config');

router.post('/', async (req, res) => {
  const ipAddress = req.body.shift();
  const countryWhitelist = req.body.pop();

  if (!(maxmind.validate(ipAddress))) {
    return res.send({error: 'Invalid IP Address. Try again later.'});
  }

  if (!(typeof countryWhitelist === 'object' && !Array.isArray(countryWhitelist) && countryWhitelist !== null)) {
    return res.send({error: 'Whitelist is not formatted correctly. Try again later.'});
  }

  try {
    const lookup = await maxmind.open(config.countryData.fileLocation);
    const locationData = await lookup.get(ipAddress);
    const country = checkLocationHelper.getCountryFromLocationData(locationData);
    const isCountryAllowed = checkLocationHelper.isCountryAllowed(country, countryWhitelist);
    res.status(200).send({location: country, allowed: isCountryAllowed});
  } catch (err) {
    res.status(500).send('Server error. Please try again later. ', err);
  }
});

module.exports = router;
