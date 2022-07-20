require("../src/config/db.config")
const express = require("express");
const serverless = require('serverless-http');
const cors = require("cors");
const app = express()

// setup cors security
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(express.json());

// router
require("../src/routers")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

module.exports = app
module.exports.handler = serverless(app)