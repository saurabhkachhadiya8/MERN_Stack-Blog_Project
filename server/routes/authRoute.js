const express = require('express');
const routes = express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});
const userImage = multer({ storage: storage }).single('userimage');

const { loginUser, registerUser, dummyApi, allUser } = require('../controllers/AuthController');
const { verifyToken, authorizeRole } = require('../middleware/Auth');

routes.post('/login', loginUser);
routes.post('/register', userImage, registerUser);
routes.get('/dummyapi', verifyToken, dummyApi);
routes.get('/adminalluser', verifyToken, authorizeRole(['admin']), allUser);

module.exports = routes;