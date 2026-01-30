const db = require("../utils/database.js");
module.exports = class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.id = id;
  }
  save() {
    return db.execute(
      "INSERT INTO products(title,price,imageUrl,description) VALUES(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description],
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE id = ?", [id]);
  }
  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE id = ? LIMIT 1", [id]);
  }
};
