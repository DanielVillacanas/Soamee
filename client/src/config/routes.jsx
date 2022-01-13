import Home from "../components/Home/Home";
import NavBar from "../components/Navbar/NavBar";

const routes = (props) => {
  return [
    {
      path: "/",
      element: (
        <>
          <NavBar {...props} />
          <Home {...props} />
        </>
      ),
    },
  ];
};

export default routes;
