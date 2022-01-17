import React, { useState } from "react";
import AuthorService from "../../services/Author/Author.service";
import UploadService from "../../services/UploadServices/UploadServices";
const auhtorService = new AuthorService();
const uploadService = new UploadService();

export default function NewAuthor(props) {
  const [author, setAuthor] = useState({
    firstName: "",
    lastName: "",
    img_url: "",
  });

  const [loadingImg, setLoadingImg] = useState(false);

  const handleSubmit = () => {
    auhtorService
      .createAuthor(author)
      .then((response) => {
        console.log(response);
        props.closeModal();
        props.updateAuthors();
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setAuthor((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleUploadChange = (e) => {
    setLoadingImg(true);
    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);
    uploadService
      .uploadImage(uploadData)
      .then((response) => {
        setLoadingImg(false);
        setAuthor({ ...author, img_url: response.data.cloudinary_url });
      })
      .catch((err) => console.log("El error", { err }));
  };

  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
      <p className="text-center font-semibold text-lg text-cyan-800">Crear un nuevo Autor</p>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                onChange={handleInputChange}
                name="firstName"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <div className="mt-1">
              <input
                id="lastName"
                onChange={handleInputChange}
                name="lastName"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="max-w rounded-lg shadow-xl bg-white">
              <div className="m-4">
                {!author.img_url && (
                  <>
                    <label className="inline-block mb-2 text-gray-500">Nueva foto</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-32 border-4 border-cyan-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                {author.img_url && (
                  <img
                    className="object-center object-cover w-32 h-32 text-gray-400 group-hover:text-gray-600 rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    src={author.img_url}
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
