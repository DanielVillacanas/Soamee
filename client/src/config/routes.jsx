import LogIn from "../components/Auth/LogIn";
import SignUp from "../components/Auth/SignUp";
import AllBooks from "../components/Books/AllBooks";
import BookDetails from "../components/Books/BookDetails";
import App from "../App";
const routes = (isLoggedIn) => {
  return [
    {
      path: "/",
      element: (
        <>
          <AllBooks isLoggedIn={isLoggedIn} />
        </>
      ),
    },
    {
      path: "/book/:id",
      element: (
        <>
          <BookDetails isLoggedIn={isLoggedIn} />
        </>
      ),
    },
    {
      path: "/signUp",
      element: (
        <>
          <SignUp isLoggedIn={isLoggedIn} />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <LogIn isLoggedIn={isLoggedIn} />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        </>
      ),
    },
  ];
};

export default routes;
