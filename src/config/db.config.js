const db = require("../../src/models");
const pass = encodeURIComponent("eBCGJZQD68av6G")
const doc = "basicAuth"
db.mongoose
  .connect(`mongodb+srv://ciptowi:${pass}@cluster0.dwfw4.mongodb.net/${doc}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });