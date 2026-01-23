const express = require("express");

const router = express.Router();

const adminController = require("../controller/adminController");

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postProduct);

router.get("/products", adminController.getAllProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
