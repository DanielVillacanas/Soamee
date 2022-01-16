import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookService from "../../services/Books/Books.service";

const booksService = new BookService();

export default function BookDetails() {
  const [Book, setBook] = useState();
  const { id } = useParams();

  useEffect(() => {
    booksService
      .getOneBook(id)
      .then((response) => setBook(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex p-11 mx-80 items-center">
      <div className="w-9/12 min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          src={Book?.img_url}
        ></img>
      </div>
      <div className="ml-11">
        <h2 className="text-6xl font-extrabold tracking-tight text-gray-900 mb-11">{Book?.name}</h2>
        <ul className="mb-11">
          {Book?.author.map((auth) => {
            return (
              <li>
                <Link to={""}>
                  {auth.fisrtName} {auth.lastName}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="max-w-6xl">
          <p className="text-md font-extrabold tracking-tight text-gray-900">Descripción:</p>
          {Book?.description}
        </p>
      </div>
    </div>
  );
}
