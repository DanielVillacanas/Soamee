import React, { useState } from "react";
import { useEffect } from "react";
import BookService from "../../services/Books/Books.service";
import { Link } from "react-router-dom";

const booksService = new BookService();

export default function FavouriteBooks(props) {
  const [favBooks, setFavBooks] = useState();

  useEffect(() => {
    getAllFavBooks();
  }, []);

  const favBook = (id) => {
    booksService
      .favBook(id)
      .then((response) => {
        getAllFavBooks();
      })
      .catch((err) => console.log(err));
  };

  const bookIsInFavs = (book) => {
    return (
      favBooks?.some((books) => books._id === book._id) === false ||
      favBooks?.length < 1 ||
      !favBooks
    );
  };

  const getAllFavBooks = () => {
    booksService
      .getFavBooks()
      .then((response) => {
        setFavBooks(response.data.favBooks);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="bg-white w-fil">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Libros</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {favBooks?.map((book) => (
              <div key={book._id} className="group relative">
                <Link to={`/book/${book._id}`}>
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={book.img_url}
                      alt={book.imageAlt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">{book.name}</h3>
                    </div>
                  </div>
                </Link>
                {props.user && (
                  <div className="mt-11">
                    {bookIsInFavs(book) ? (
                      <button onClick={() => favBook(book._id)}>
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-bookmark-star"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                          </svg>
                          <p>Añadir a favoritos</p>
                        </div>
                      </button>
                    ) : (
                      <button onClick={() => favBook(book._id)}>
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-bookmark-star-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                            />
                          </svg>
                          <p>Libro en tus favoritos</p>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
