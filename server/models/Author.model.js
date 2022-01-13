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
});

const Author = model("Author", authorSchema);

module.exports = Author;
