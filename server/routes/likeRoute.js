const express = require("express");
const routes = express.Router();
const { handleLike, handleDislike } = require("../controllers/LikeController");

routes.put("/handle_like", handleLike);
routes.put("/handle_dislike", handleDislike);

module.exports = routes;
