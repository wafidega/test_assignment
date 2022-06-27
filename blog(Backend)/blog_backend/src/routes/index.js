const { request, response } = require("express");
const express = require("express");
const Router = express.Router();
const adminRoutes = require("../modules/admin/adminRoutes");
const blogRoutes = require("../modules/blog/blogRoutes");

// Router.get("/hello", (request, response) => {
//   response.send("Hello World");
// });

Router.use("/admin", adminRoutes);
Router.use("/blog", blogRoutes);

module.exports = Router;
