const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("Book llegan como JSON", async () => {
  await api
    .get("/api/books/books")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
});

test("Crea un libro correctamente", async () => {
  await api
    .post("/api/books/book", {
      name: "TEST",
      isbn: "TEST",
      description: "TEST",
      author: ["12321334"],
    })
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
});
