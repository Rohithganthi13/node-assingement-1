const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    //read the previous data in cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && (fileContent.length > 0)) {
        cart = JSON.parse(fileContent);
      }
      //add new product if not exist or increase the qty if exist
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id,
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, price: price, qty: 1 };
        cart.products.push(updatedProduct);
      }
      //save the product in cart
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
