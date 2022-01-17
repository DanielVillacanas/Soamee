import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import routes from "./config/routes";
import AuthService from "./services/Auth/Auth.service";

const authService = new AuthService();

function App() {
  const [user, setUser] = useState();
  const [updateBooks, setUpdateBooks] = useState();
  const navigate = useNavigate();
  const isLoggedIn = () => {
    authService
      .isLoggedIn()
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log({ err }));
  };
  const logout = () => {
    authService
      .logOut()
      .then((response) => {
        setUser(undefined);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <NavBar
        isLoggedIn={isLoggedIn}
        logout={logout}
        user={user}
        setUpdateBooks={setUpdateBooks}
      ></NavBar>
      <Routes>
        {routes(isLoggedIn, user, updateBooks).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
