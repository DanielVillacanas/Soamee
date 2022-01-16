import axios from "axios";

class AuthService {
  constructor() {
    this.app = axios.create({
      baseURL: `http://localhost:5000/api/auth`,
      withCredentials: true,
    });
  }

  createUser = (userName, password) => this.app.post("/signUp", { userName, password });
  logIn = (userName, password) => this.app.post("/login", { userName, password });
  isLoggedIn = () => this.app.get("/isLoggedIn");
  logOut = () => this.app.get("/logout");
}

export default AuthService;
