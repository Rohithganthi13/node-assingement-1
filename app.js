const express = require("express");
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRouter");

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

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

app.listen(3000);
