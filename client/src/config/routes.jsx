import LogIn from "../components/Auth/LogIn";
import SignUp from "../components/Auth/SignUp";
import AllBooks from "../components/Books/AllBooks";
import BookDetails from "../components/Books/BookDetails";
import App from "../App";
import FavouriteBooks from "../components/Books/FavouriteBooks";
import AllAuthors from "../components/Author/AllAuthors";
import AuthorDetails from "../components/Author/AuthorDetails";
const routes = (isLoggedIn, user, updateBooks) => {
  return [
    {
      path: "/",
      element: (
        <>
          <AllBooks isLoggedIn={isLoggedIn} user={user} updateBooks={updateBooks} />
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
      path: "/favouriteBook",
      element: (
        <>
          <FavouriteBooks isLoggedIn={isLoggedIn} user={user} />
        </>
      ),
    },
    {
      path: "/authors",
      element: (
        <>
          <AllAuthors isLoggedIn={isLoggedIn} user={user} />
        </>
      ),
    },
    {
      path: "/author/:id",
      element: (
        <>
          <AuthorDetails isLoggedIn={isLoggedIn} user={user} />
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
