const express = require('express');
const routes = express.Router();
const multer = require('../middleware/Multer');

const { loginUser, registerUser } = require('../controllers/AuthController');

routes.post('/login', loginUser);
routes.post('/register', multer.single('userimage'), registerUser);

module.exports = routes;