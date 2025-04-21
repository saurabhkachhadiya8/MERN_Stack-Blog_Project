const express = require('express');
const routes = express.Router();
const { fetchData } = require('../controllers/HomePageController');

routes.get('/fetchdata', fetchData);

module.exports = routes;