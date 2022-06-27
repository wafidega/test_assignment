const { request, response } = require("express");
const express = require("express");
const Router = express.Router();
const blogController = require("./blogController");
const middlewareUpload = require("../../middleware/uploadBlog");

Router.post("/post-blog", middlewareUpload, blogController.postBlog);
Router.patch("/update-blog/:id", middlewareUpload, blogController.updateBlog);
Router.delete("/delete-blog/:id", blogController.deleteBlog);
Router.get("/", blogController.getAllBlog);
Router.get("/:id", blogController.getBlogById);

module.exports = Router;
