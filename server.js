'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/index.routes'));

app.get('/', (req, res) => res.json({message: 'All systems operational'}));

app.listen(config.app.port, () => console.log(`Server started. Listening on port ${config.app.port}`));

module.exports = app;