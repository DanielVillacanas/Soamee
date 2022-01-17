const router = require("express").Router();
const Author = require("../../models/Author.model");
const { isLoggedIn } = require("../../middlewares/isloggedIn");
router.post("/author", isLoggedIn, (req, res) => {
  const { author } = req.body;

  Author.create(author)
    .then((response) => res.json(response))
    .catch((err) => {
      res.error(err);
    });
});

router.get("/authors", (req, res) => {
  Author.find()
    .populate("books")
    .then((response) => res.json(response))
    .catch((err) => res.error(err));
});

router.get("/authors/:id", (req, res) => {
  const { id } = req.params;

  Author.findById(id)
    .populate("books")
    .then((response) => res.json(response))
    .catch((err) => res.error(err));
});

router.put("/authorNewBook/:book_id", isLoggedIn, (req, res) => {
  const { book_id } = req.params;
  const { authors } = req.body;

  authors.map((author) => {
    Author.findByIdAndUpdate(author, { $push: { books: book_id } })
      .then((response) => res.json(response))
      .catch((err) => console.log(err));
  });
});

module.exports = router;
