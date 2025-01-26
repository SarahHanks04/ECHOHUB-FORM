import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4 font-roboto">
      <h1 className="text-4xl md:text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg md:text-2xl mt-4 text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-[#FDBF17] text-black rounded-md transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
