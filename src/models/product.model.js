const mongoose = require("mongoose");
const User = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
  })
);
module.exports = User;