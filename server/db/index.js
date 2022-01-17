const mongoose = require("mongoose");

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

NODE_ENV === "test" ? (MONGO_URI = MONGODB_URI_TEST) : (MONGO_URI = MONGODB_URI);
// const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/Soamee";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
