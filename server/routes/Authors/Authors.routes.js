const router = require("express").Router();
const Author = require("../../models/Author.model");

router.post("/author", (req, res) => {
  const { author } = req.body;
  Author.create(author)
    .then((response) => res.json(response))
    .catch((err) => {
      res.error(err);
    });
});
router.get("/authors", (req, res) => {
  Author.find()
    .then((response) => res.json(response))
    .catch((err) => res.error(err));
});

module.exports = router;
