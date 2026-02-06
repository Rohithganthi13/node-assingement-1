const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "nodeuser", "nodepassword", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
