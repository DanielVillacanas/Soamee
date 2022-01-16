import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import routes from "./config/routes";
import AuthService from "./services/Auth/Auth.service";

const authService = new AuthService();

function App() {
  const [user, setUser] = useState();
  const isLoggedIn = () => {
    authService
      .isLoggedIn()
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  };
  const logout = () => {
    authService
      .logOut()
      .then(setUser(undefined))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} logout={logout} user={user}></NavBar>
      <Routes>
        {routes(isLoggedIn).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
