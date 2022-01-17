const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  firstName: {
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
  books: {
    type: [Schema.Types.ObjectId],
    ref: "Book",
  },
});

const Author = model("Author", authorSchema);

module.exports = Author;
