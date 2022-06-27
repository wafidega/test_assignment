const { promise } = require("../../config/mysql");
const connection = require("../../config/mysql");

module.exports = {
  postBlog: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO post SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  updateBlog: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE post SET ? WHERE id = ?",
        [data, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  deletePost: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM post WHERE id = ?", id, (error, result) => {
        if (!error) {
          resolve(id);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getAllBlog: (limit, offset) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "SELECT * FROM post LIMIT ? OFFSET ?",
        [limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getBlogById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM post WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getCountBlog: () =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) AS total FROM post",
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
