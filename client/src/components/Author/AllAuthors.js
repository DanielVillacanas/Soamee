import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthorService from "../../services/Author/Author.service";

const authorService = new AuthorService();

export default function AllAuthors(props) {
  const [authors, setAuthors] = useState();

  const updateAuthors = () => {
    authorService
      .getAllAuthor()
      .then((response) => setAuthors(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    updateAuthors();
  }, []);
  return (
    <div>
      <div className="bg-white w-fil">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Autores</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {authors?.map((author) => (
              <div key={author._id} className="group relative">
                <Link to={`/author/${author._id}`}>
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={author.img_url}
                      alt={author.imageAlt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {author.firstName} {author.lastName}
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
