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
    <div className="flex p-11 mx-11 items-center justify-center  lg:flex-row flex-col">
      <div className="">
        <img className="" src={Book?.img_url} alt="Book"></img>
      </div>
      <div className="m-11">
        <h2 className="lg:text-4xl">{Book?.name}</h2>
        <ul className="mb-11">
          {Book?.author.map((auth) => {
            return (
              <li key={auth._id}>
                <Link to={`/author/${auth._id}`}>
                  {auth.firstName} {auth.lastName}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="text-md font-extrabold tracking-tight text-gray-900">Descripción:</p>
        {Book?.description}
      </div>
    </div>
  );
}
