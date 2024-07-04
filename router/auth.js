const express = require("express");
const Router = express.Router();
const authControler = require("../controler/auth");
Router.post("/register", authControler.registerUser);
Router.post("/login", authControler.logIn);
module.exports = Router;
