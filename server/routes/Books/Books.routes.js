const router = require("express").Router();
const Book = require("../../models/Book.model");
router.post("/book", (req, res) => {
  const book = req.body;

  Book.create(book)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
router.get("/books", (req, res) => {
  Book.find()
    .populate("author")
    .then((response) => res.json(response))
    .catch((error) => console.error(error));
});
router.get("/book/:id", (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .populate("author")
    .then((response) => res.json(response))
    .catch((error) => console.error(error));
});

module.exports = router;
