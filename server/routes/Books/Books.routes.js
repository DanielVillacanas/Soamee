const router = require("express").Router();
const Book = require("../../models/Book.model");
const User = require("../../models/User.model");
const { isLoggedIn } = require("../../middlewares/isloggedIn");
const { response } = require("express");

router.post("/book", isLoggedIn, (req, res) => {
  const book = req.body;
  const isbn = book.isbn;
  Book.findOne({ isbn })
    .then((response) => {
      response === null
        ? Book.create(book).then((response) => res.json(response))
        : res.status(500).send("Ya existe un libro con el mismo ISBN");
    })
    .catch((err) => res.status(500).send("Error al crear libro"));
});

router.get("/books", (req, res) => {
  Book.find()
    .populate("author")
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error));
});

router.get("/book/:id", (req, res) => {
  const { id } = req.params;

  Book.findById(id)
    .populate("author")
    .then((response) => res.json(response))
    .catch((error) => res.status(500).send(error));
});

router.put("/favBook/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  const userId = req.session.currentUser;

  User.findById(userId)
    .then((response) => {
      if (response.favBooks.some((books) => books._id.equals(id))) {
        return User.findByIdAndUpdate(userId, { $pull: { favBooks: id } }, { new: true }).populate(
          "favBooks"
        );
      } else {
        return User.findByIdAndUpdate(userId, { $push: { favBooks: id } }, { new: true }).populate(
          "favBooks"
        );
      }
    })
    .then((user) => {
      res.json(user.favBooks);
    })
    .catch((err) => console.log(err));
});

router.get("/getFavBooks", isLoggedIn, (req, res) => {
  const user_id = req.session.currentUser?._id;

  User.findById(user_id)
    .populate("favBooks")
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
