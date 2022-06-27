const { request, response } = require("express");
const express = require("express");
const Router = express.Router();
const adminController = require("./adminController");

// Router.get("/", (request, response) => {
//   response.send("Hello World");
// });

Router.post("/login", adminController.login);
Router.post("/register", adminController.register);
Router.post("/logout", adminController.logout);
Router.get("/user-byid/:id", adminController.getUserByIdUser);
module.exports = Router;
