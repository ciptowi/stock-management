const db = require("../models");
const Product = db.product;

exports.createProduct = (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  });
  product.save((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: null,
        data: null,
        error: err.message
      });
      return;
    }
    else {
      res.status(201).json({
        success: true,
        message: "Product was created successfully!",
        data: null,
        error: null
      });
    }
  });
}
exports.readAllProducts = (req, res) => {
  Product.find().then((data) => {
    res.status(200).json({
      success: true,
      message: "All products",
      data: data,
      error: null
    });
  })
}
exports.readProductById = (req, res) => {
  const productId = req.params.id
  Product.findById(productId).then((data) => {
    res.status(200).json({
      success: true,
      message: `Product by ID ${productId}`,
      data: data,
      error: null
    })
  })
}
exports.updateProductById = (req, res) => {
  const productId = req.params.id
  const newProduct = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  };
  Product.findByIdAndUpdate(productId,
    newProduct, (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: null,
          data: null,
          error: err
        });
        return;
      }
      else {
        res.status(200).json({
          success: true,
          message: "Product was updated successfully!",
          data: null,
          error: null
        });
      }
    });
}
exports.deleteProductById = (req, res) => {
  const productId = req.params.id
  Product.findByIdAndDelete(productId,
    (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: null,
          data: null,
          error: err.message
        });
        return;
      }
      else {
        res.status(200).json({
          success: true,
          message: "Product was deleted successfully!",
          data: null,
          error: null
        });
      }
    });
}