import axios from "axios";

class BookService {
  constructor() {
    this.app = axios.create({
      baseURL: `http://localhost:5000/api/books`,
      withCredentials: true,
    });
  }
  createBook = (Book) => {
    console.log(Book);
    return this.app.post("/book", Book);
  };
  getAllBooks = () => this.app.get("/books");
  getOneBook = (id) => this.app.get(`/book/${id}`);
}

export default BookService;
