const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
});

module.exports = Cart;
