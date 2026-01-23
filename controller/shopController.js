const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
    });
  });
};

exports.getProductsDetail = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: "Product details",
      path: "/products",
      product: product,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const price = req.body.productPrice;
  console.log(prodId, price);
  Cart.addProduct(prodId, price);
  res.redirect("/");
};
