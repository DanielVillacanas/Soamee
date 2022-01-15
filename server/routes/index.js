module.exports = (app) => {
  app.use("/api/books", require("./Books/Books.routes"));
  app.use("/api/authors", require("./Authors/Authors.routes"));
  app.use("/api/upload", require("./upload/uploads.routes"));
};
