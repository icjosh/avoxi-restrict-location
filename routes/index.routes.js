'use strict';

const express = require('express');
const router = express.Router();

router.use('/api/v1/check-location', require('./checkLocation.routes'));

module.exports = router;
