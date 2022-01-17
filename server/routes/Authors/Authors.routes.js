const router = require("express").Router();
const Author = require("../../models/Author.model");
const { isLoggedIn } = require("../../middlewares/isloggedIn");
const { Promise } = require("mongoose");

router.post("/author", isLoggedIn, (req, res) => {
  const { author } = req.body;
  console.log(author);
  Author.create(author)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send({ err }));
});

router.get("/authors", (req, res) => {
  Author.find()
    .populate("books")
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send({ err }));
});

router.get("/authors/:id", (req, res) => {
  const { id } = req.params;

  Author.findById(id)
    .populate("books")
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send({ err }));
});

router.put("/authorNewBook/:book_id", isLoggedIn, (req, res) => {
  const { book_id } = req.params;
  const { authors } = req.body;
  const promises = [];

  authors.map((author) => {
    promises.push(Author.findByIdAndUpdate(author, { $push: { books: book_id } }));
  });

  Promise.all(promises)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send({ err }));
});

module.exports = router;
