const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const { connectDB } = require("./db/connectDb");

const app = express();
const port = 3000;
connectDB();
// Middleware
app.use(bodyParser.json());
app.use(router);
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
