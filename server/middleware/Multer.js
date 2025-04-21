const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});
module.exports = multer({ storage: storage });