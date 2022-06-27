const { request, response } = require("express");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/uploads/delete");
const blogModel = require("./blogModel");

module.exports = {
  postBlog: async (req, res) => {
    try {
      const { title, content, image } = req.body;
      const setData = {
        title,
        content,
        image: req.file ? req.file.filename : null,
      };
      const result = await blogModel.postBlog(setData);
      return helperWrapper.response(res, 200, "Success create data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await blogModel.getBlogById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by Id ${id} Not FOund`,
          null
        );
      }
      const { title, content, image } = req.body;
      const setData = {
        title,
        content,
        image: req.file ? req.file.filename : null,
        updateAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }
      if (checkId[0].image && req.file) {
        deleteFile(`public/upload/blog/${checkId[0].image}`);
      }
      const result = await blogModel.updateBlog(setData, id);
      return helperWrapper.response(res, 200, "Sucess update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await blogModel.getBlogById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by Id ${id} Not FOund`,
          null
        );
      }
      if (checkId[0].image) {
        deleteFile(`public/upload/blog/${checkId[0].image}`);
      }
      const result = await blogModel.deletePost(id);
      return helperWrapper.response(res, 200, "Delete Sucess", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  getAllBlog: async (request, response) => {
    try {
      let { page, limit } = request.query;
      page = Number(page);
      limit = Number(limit);
      const offset = page * limit - limit;
      const totalData = await blogModel.getCountBlog();
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page, // page: page
        totalPage,
        limit,
        totalData,
      };

      const result = await blogModel.getAllBlog(limit, offset);

      return helperWrapper.response(
        response,
        200,
        "Success get data",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        response,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await blogModel.getBlogById(id);
      //nympen data di redis
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by Id ${id} Not FOund`,
          null
        );
      } else {
        return helperWrapper.response(
          res,
          200,
          "Sukses get data by Id",
          result
        );
      }
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
};
