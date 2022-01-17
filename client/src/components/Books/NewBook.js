import React, { useState } from "react";
import BookService from "../../services/Books/Books.service";
import UploadService from "../../services/UploadServices/UploadServices";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import AuthorService from "../../services/Author/Author.service";

const bookService = new BookService();
const authorService = new AuthorService();
const uploadService = new UploadService();

export default function NewBook(props) {
  const [Book, setBook] = useState({
    name: "",
    isbn: "",
    description: "",
    author: [],
  });
  const [authors] = useState(props.authors);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleSubmit = (e) => {
    bookService
      .createBook(Book)
      .then((response) => {
        return authorService
          .addNewBookAuthor(response.data._id, selectedAuthors)
          .then((response) => {
            props.closeModal();
            props.setUpdateBooks(Book);
          });
      })
      .catch((error) => console.error(error));
    e.preventDefault();
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

  const addAuthor = (author) => {
    let copy = [...Book.author];
    let copy1 = [...selectedAuthors];

    copy.indexOf(author._id) === -1 && copy.push(author._id);
    copy1.indexOf(author) === -1 && copy1.push(author);
    setBook({ ...Book, author: copy });
    setSelectedAuthors(copy1);
  };

  const handleUploadChange = (e) => {
    setLoadingImg(true);
    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);
    uploadService
      .uploadImage(uploadData)
      .then((response) => {
        setLoadingImg(false);
        setBook({ ...Book, img_url: response.data.cloudinary_url });
      })
      .catch((err) => console.log("El error", { err }));
  };

  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
      <p className="text-center font-semibold text-lg text-cyan-800">Crear un nuevo Libro</p>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              ISBN
            </label>
            <div className="mt-1">
              <input
                id="isbn"
                onChange={handleInputChange}
                name="isbn"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <div className="mt-1 ">
              <textarea
                id="description"
                onChange={handleInputChange}
                name="description"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-500">
                  Autor/es
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="origin-top-right absolute right--10 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  id="authors"
                >
                  <div className="py-1">
                    {authors?.map((auth) => (
                      <Menu.Item key={auth._id}>
                        {({ active }) => (
                          <div className="flex justify-between pl-3 pr-3 pt-1 pb-1">
                            <p className="pl-3 pr-3 pt-1 pb-1">
                              {auth.firstName} {auth.lastName}
                            </p>
                            <button
                              type="button"
                              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => addAuthor(auth)}
                            >
                              Añadir
                            </button>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div>
            <ul>
              <h5 className="mb-3">Autores :</h5>
              {selectedAuthors?.map((auth) => (
                <li
                  className="rounded-full bg-cyan-500 text-white shadow-sm w-cover text-center pb-2 pt-2 mb-3 "
                  key={auth._id}
                >
                  {auth.firstName} {auth.lastName}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center mt-8">
            <div className="max-w rounded-lg shadow-xl bg-white">
              <div className="m-4">
                {!Book.img_url && (
                  <>
                    <label className="inline-block mb-2 text-gray-500">Nueva foto</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-4 border-cyan-500 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600 pt-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          {!loadingImg && (
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Sube una foto
                            </p>
                          )}
                          {loadingImg && (
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-cyan-500 hover:bg-cyan-400 transition ease-in-out duration-150 cursor-not-allowed"
                              disabled=""
                            >
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Cargando...
                            </button>
                          )}
                        </div>

                        <input
                          type="file"
                          name="imageData"
                          className="opacity-0"
                          onChange={handleUploadChange}
                        />
                      </label>
                    </div>
                  </>
                )}
                {Book.img_url && (
                  <img
                    className="object-center object-cover w-32 h-32 text-gray-400 group-hover:text-gray-600 rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={Book.img_url}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center p-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
