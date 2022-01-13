const router = require("express").Router();
const Book = require("../../models/Book.model");
router.post("/book", (req, res, next) => {
  const { book } = req.body;
  console.log(book);
  Book.create(book)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

module.exports = router;
