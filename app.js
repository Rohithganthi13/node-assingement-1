const express = require("express");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRouter");
const sequelize = require("./utils/database.js");
const bodyParser = require("body-parser");
const User = require("./models/user.js");
const Product = require("./models/product.js");
const Cart = require("./models/cart.js");
const CartItem = require("./models/cartItem.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page not found",
    path: "",
  });
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Rohith", email: "rohith@test.com" });
    }
    return user;
  })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
