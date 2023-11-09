import React, { useEffect, useState } from "react";
import Pending from "../components/Pending/Pending";
import Error from "../components/Error/Error";
import { useReadFactoryQuery } from "../features/api/apiSlice";
import Pagination from "../components/Pagination/Pagination";
import Footer from "../components/Footer/Footer";

function Gallery() {
  const [query, setQuery] = useState(`page=1&limit=9&visible=true`);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "gallery",
    query,
  });

  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter > 3) setCounter(3);
    if (counter < 1) setCounter(1);
    setQuery(`page=${counter}&limit=9&visible=true`);
  }, [counter]);

  return (
    <>
      <section className="login-section text-center ">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Gallery ({data?.data?.length})
          </h1>
        </div>
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div className="container relative gap-12 page-padding py-[10rem] md1000:grid-cols-2 min620:grid-cols-1 grid-cols-3 grid-rows-3 text-left grid">
          {data?.data?.map((gallery) => (
            <div key={gallery._id}>
              <img
                alt="gallery_img"
                className="w-full run-bg h-full"
                src={gallery.image}
              />
            </div>
          ))}
          <Pagination counter={counter} setCounter={setCounter} />
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Gallery;
