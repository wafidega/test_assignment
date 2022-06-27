const { request, response } = require("express");
const helperWrapper = require("../../helpers/wrapper");
const { v4: uuidv4 } = require("uuid");
const adminModel = require("./adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await adminModel.getUserByEmail(email);
      console.log(checkUser);
      const isMatch = await bcrypt.compare(password, checkUser[0].password);
      if (!isMatch) {
        return helperWrapper.response(res, 400, "Wrong Password");
      }
      console.log(checkUser);
      const payload = checkUser[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "24h",
      });
      return helperWrapper.response(res, 200, "Success Login", {
        id: payload.id,
        token,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request (${error.message})`,
        null
      );
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const checkEmail = await adminModel.getUserByEmail(email);
      //Pengecekan Email
      if (checkEmail.length > 0) {
        return helperWrapper.response(res, 400, "Email already exits");
      }
      // Enkrip password
      const passwordEnkrip = await bcrypt.hash(password, 10);
      const setData = {
        id: uuidv4(),
        email,
        password: passwordEnkrip,
        name,
      };
      const result = await adminModel.register(setData);
      // console.log(password);
      return helperWrapper.response(res, 200, "Success register user", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request (${error.message})`,
        null
      );
    }
  },
  logout: async (req, res) => {
    try {
      let token = req.headers.authorization;
      // console.log(token);
      token = token.split(" ")[1];
      return helperWrapper.response(res, 200, "Success Logout", null);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad Request (${error.message})`,
        null
      );
    }
  },
  getUserByIdUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await adminModel.getUserByIdUser(id);
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
          "Sukses get User by Id",
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
