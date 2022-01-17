import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorService from "../../services/Author/Author.service";

const authorService = new AuthorService();

export default function AuthorDetails() {
  const [Author, setAuthor] = useState();
  const { id } = useParams();

  const getAuthor = () => {
    authorService
      .getOneAuthor(id)
      .then((response) => setAuthor(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAuthor();
  }, []);
  return (
    <div>
      <div className="flex p-11 mx-11 items-center justify-center lg:flex-row flex-col">
        <div className="w-80">
          <img className="" src={Author?.img_url} alt="Author"></img>
        </div>
        <div className="ml-11">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-11">
            {Author?.firstName} {Author?.lastName}
          </h2>
          <ul className="mb-11">
            <p>Libros :</p>
            {Author?.books.map((book) => {
              return (
                <li className="mt-4">
                  <Link to={`/book/${book._id}`}> - {book.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
