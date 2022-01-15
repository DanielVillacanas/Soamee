const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: [Schema.Types.ObjectId],
    ref: "Author",
  },
  img_url: {
    type: String,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
