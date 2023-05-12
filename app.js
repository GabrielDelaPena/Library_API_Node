const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import routes
const bookRoutes = require("./routes/book");

const app = express();

// Configuration
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/", bookRoutes);

mongoose
  .connect(
    "mongodb+srv://GabrielDP:Alfakaparo09@cluster0.uscr7ng.mongodb.net/library?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("CONNECTED");
    app.listen(8081);
  })
  .catch((err) => console.log(err));
