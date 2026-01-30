const express = require("express");

const router = express.Router();

const shopController = require("../controller/shopController");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:prodId", shopController.getProductsDetail);

router.post("/cart", shopController.postCart);

router.get("/cart", shopController.getCart);

module.exports = router;
