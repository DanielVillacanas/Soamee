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
  author: {
    type: [Schema.Types.ObjectId],
    ref: "Author",
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
