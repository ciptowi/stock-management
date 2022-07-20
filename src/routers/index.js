const {verifySignUp, verifyAuth} = require("../middlewares");
const auth = require("../controllers/auth.controllers");
const product = require("../controllers/product.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkValidationForm], auth.signup);
  app.post("/api/auth/signin", [verifyAuth.checkValidationForm], auth.signin);

  app.put("/api/user/update", [verifyAuth.verifyToken], auth.updateUser);
  app.delete("/api/user/delete", [verifyAuth.verifyToken], auth.deleteUser);

  app.post("/api/create/product", [verifyAuth.verifyToken], product.createProduct);
  app.get("/api/products", [verifyAuth.verifyToken], product.readAllProducts);
  app.get("/api/product/:id", [verifyAuth.verifyToken], product.readProductById);
  app.put("/api/product/:id", [verifyAuth.verifyToken], product.updateProductById);
  app.delete("/api/product/:id", [verifyAuth.verifyToken], product.deleteProductById);
};