const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: rows,
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render("shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      prods: rows,
    });
  });
};

exports.getProductsDetail = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId).then(([rows]) => {
    const product = rows[0];
    if (!product) {
      return res.redirect("/");
    }
    res.render("shop/product-detail", {
      pageTitle: product?.title,
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
  res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cart) => {
    res.render("shop/cart", {
      pageTitle: "Cart",
      path: "/cart",
      products: cart.products,
      totalPrice: cart.totalPrice,
    });
  });
};
