const express = require("express");
const Router = express.Router();
const moviesControler = require("../controler/moves");
Router.get("/movies", moviesControler.getMovies);
Router.post("/postbookmark", moviesControler.postBookMark);
Router.delete("/deletbookmar/:id", moviesControler.deleteBookMarked);

module.exports = Router;
