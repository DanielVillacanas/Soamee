import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/Auth/Auth.service";

const authService = new AuthService();

export default function LogIn(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [errMessage, setErrMessage] = useState();

  const navigate = useNavigate();

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    if (e.currentTarget.name === "password2" && e.currentTarget.value !== "") {
      e.currentTarget.value !== user.password
        ? setErrMessage("Las contraseñas no coinciden")
        : setErrMessage(undefined);
    } else {
      setErrMessage(undefined);
    }
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    errMessage === undefined &&
      authService
        .logIn(user.username, user.password)
        .then((response) => {
          props.isLoggedIn();
          response.data && navigate({ pathname: "/" });
        })
        .catch((err) => setErrMessage(err.response.data));
  };

  return (
    <div className="mt-11 h-max">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-200 py-2 px-4 shadow mdunded-lg rounded-md	">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleInputChange}
                  value={user.username}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  value={user.password}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Comprobación de contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  onChange={handleInputChange}
                  value={user.password2}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                />
                {errMessage && <p className="text-red-500">{errMessage}</p>}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Inicio de sesión
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-200 text-gray-500">¿ Aun no tienes cuenta ?</span>
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/login"
              className="bg-slate-300 mt-6 w-full flex justify-center py-2 px-4 border border-cyan-600 rounded-md shadow-md text-sm font-medium text-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-11"
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
