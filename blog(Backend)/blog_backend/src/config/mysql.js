const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You Are now connected db mysql...");
});

module.exports = connection;
