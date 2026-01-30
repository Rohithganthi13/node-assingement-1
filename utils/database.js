const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "nodeuser",
  database: "node-complete",
  password: "nodepassword",
});

module.exports = pool.promise();
