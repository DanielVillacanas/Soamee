module.exports = (app) => {
  app.use("/api/books", require("./Books/Books.routes"));
};
