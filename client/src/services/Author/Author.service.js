import axios from "axios";

class AuthorService {
  constructor() {
    this.app = axios.create({
      baseURL: `http://localhost:5000/api/authors`,
      withCredentials: true,
    });
  }

  createAuthor = (author) => this.app.post("/author", { author });
  getAllAuthor = () => this.app.get("/authors");
  getOneAuthor = (id) => this.app.get(`/authors/${id}`);
}

export default AuthorService;
