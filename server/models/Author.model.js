const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  fisrtName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
  },
});

const Author = model("Author", authorSchema);

module.exports = Author;
