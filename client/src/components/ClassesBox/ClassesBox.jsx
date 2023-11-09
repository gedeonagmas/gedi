import { useEffect, useState } from "react";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import Error from "../Error/Error";
import Pending from "../Pending/Pending";

function ClassesBox() {
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({ type: "class" });

  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <>
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      {data &&
        data?.data?.map((d) => {
          return (
            <div
              className={`bg-[url(http://localhost:5000/uploads/${d.image})] rounded-3xl shadow-2xl flex flex-col h-[46rem] relative p-[40px]`}
            >
              <span className="bg-[#0000004a] rounded-3xl w-full h-full absolute top-0 left-0"></span>

              <div className="flex flex-col align-text-bottom h-full w-full z-[2] justify-end">
                <p className="text-white font-bold text-[2.7rem] mb-3">
                  {d.title}
                </p>

                <span className="bg-[#ff0336] w-[50px] h-[4px]"></span>

                <div className="flex gap-6 mb-14 mt-6 text-[#ffffffe1] text-[1.6rem] font-medium">
                  <p>
                    <i className="fa-regular fa-user"></i> {d.trainer}
                  </p>
                  <p>
                    <i className="fa-regular fa-clock"></i>{" "}
                    {d.date.split(" ").splice(0, 4).join(" ")}
                  </p>
                </div>

                <button
                  className={`text-[15px] text-black bg-white text-center pt-[14px] pb-4 font-[600] w-[20rem] h-[5.5rem] uppercase hero-cta relative ml-2  `}
                >
                  join now
                  <i
                    className={`fa-arrow-right text-[#FF0336] border-2 border-white`}
                  ></i>
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ClassesBox;
