import axios from "axios";

class BookService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/books`,
      withCredentials: true,
    });
  }
  createBook = (Book) => this.app.post("/book", Book);
  getAllBooks = () => this.app.get("/books");
  getOneBook = (id) => this.app.get(`/book/${id}`);
  favBook = (id) => this.app.put(`/favBook/${id}`);
  getFavBooks = () => this.app.get("/getFavBooks");
}

export default BookService;
