import React, { useEffect, useState } from "react";
import BookService from "../../services/Books/Books.service";
import { Link } from "react-router-dom";

const booksService = new BookService();

export default function AllBooks() {
  const [books, setBooks] = useState();
  const [filterdBook, setFilteredBook] = useState();

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    let copy = [...books];
    copy = copy.filter((book) => book.name.toUpperCase().includes(value.toUpperCase()));
    setFilteredBook(copy);
  };
  useEffect(() => {
    booksService
      .getAllBooks()
      .then((response) => {
        setBooks(response.data);
        setFilteredBook(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className=" mt-20 mb-8 mx-12 relative flex items-center border-2 border-cyan-300 rounded-lg w-8/12">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar..."
          onChange={(e) => handleInputChange(e)}
          className="p-6 h-12 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-green-300 rounded-md"
        />
      </div>
      <div className="bg-white w-fil">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Libros</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filterdBook?.map((book) => (
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
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {book.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
