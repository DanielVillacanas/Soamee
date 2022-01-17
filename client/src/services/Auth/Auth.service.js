import axios from "axios";

class AuthService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}/api/auth`,
      withCredentials: true,
    });
  }

  createUser = (userName, password) => this.app.post("/signUp", { userName, password });
  logIn = (userName, password) => this.app.post("/login", { userName, password });
  isLoggedIn = () => this.app.get("/isLoggedIn");
  logOut = () => this.app.get("/logout");
}

export default AuthService;
