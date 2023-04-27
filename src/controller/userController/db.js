const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smart_farm",
});
db.connect();

module.exports = db;
