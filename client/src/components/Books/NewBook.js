import React, { useEffect, useState } from "react";
import AuthorService from "../../services/Author/Author.service";
import BookService from "../../services/Books/Books.service";

export default function NewBook() {
  const [book, setBook] = useState({
    name: "",
    isbn: "",
    author: "",
  });
  const [nameErr, setnameErr] = useState();
  const [isbnErr, setisbnErr] = useState();
  const [authorErr, setauthorErr] = useState();

  const [authors, setAuthors] = useState();
  const authorService = new AuthorService();
  const booksService = new BookService();

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = () =>
    authorService
      .getAllAuthor()
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    booksService.createBook(book);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setBook((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <div
      class="modal fade"
      id="newBook"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Nuevo Libro
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    onChange={handleInputChange}
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  ISBN
                </label>
                <div className="mt-1">
                  <input
                    id="ISBN"
                    onChange={handleInputChange}
                    name="isbn"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>
              <div class="modal-footer" style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
