import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = (props) => {
  return (
    <section className="login-section">
      <div className="login-banner relative justify-center flex">
        <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
          {props.message}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src="./error2.jpg" alt="page not found" className="w-[30%]" />
        <Link
          to="/"
          className="mt-2 text-[16px] hover:text-gray-200 px-10 py-4 rounded-md text-white bg-black"
        >
          Back To Home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
