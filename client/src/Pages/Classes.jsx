import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import {
  useJoinClassMutation,
  useReadFactoryQuery,
} from "../features/api/apiSlice";
import Pending from "../components/Pending/Pending";
import Success from "../components/Success/Success";
import Error from "../components/Error/Error";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

function Classes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(`page=1&limit=9&visible=true`);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "class",
    query,
  });

  const [joinData, response] = useJoinClassMutation();

  const [classData, setClassData] = useState();
  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const joinHandler = (data) => {
    const user = localStorage.getItem("gymate-user-data-gedeon");
    if (!user) navigate("/login", { replace: true });
    joinData({
      id: data._id,
    });
  };

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    response?.status === "pending" ? setPending(true) : setPending(false);
    response?.status === "rejected"
      ? (setErrorMessage(response?.error?.data?.message), setError(true))
      : null;
    response?.status === "fulfilled"
      ? (setSuccessMessage(response?.data?.message),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 3000))
      : null;
  }, [response]);

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter > 3) setCounter(3);
    if (counter < 1) setCounter(1);
    setQuery(`page=${counter}&limit=9&visible=true`);
  }, [counter]);

  useEffect(() => {
    if (location?.search) {
      setClassData(
        data?.data?.filter(
          (d) => d.difficulty === location?.search?.split("?")[1]
        )
      );
    } else if (!location.search) {
      setClassData(data?.data);
    }
  }, [location, data]);

  return (
    <>
      <section className="login-section text-center ">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Classes ({data?.data?.length})
          </h1>
        </div>

        <div
          className={`container relative gap-12 page-padding py-[10rem] md1000:grid-cols-2 min620:grid-cols-1 grid-cols-3 grid-rows-3 text-left grid`}
        >
          {pending && cancel && <Pending setPending={setCancel} />}
          {successMessage && success && <Success message={successMessage} />}
          {errorMessage && error && (
            <Error message={errorMessage} setError={setError} />
          )}
          {isFetching && cancel && <Pending setPending={setCancel} />}
          {classData &&
            classData?.map((d) => {
              return (
                <div
                  key={d._id}
                  className={`rounded-3xl shadow-2xl flex flex-col h-[46rem] relative`}
                >
                  <img
                    src={d.image}
                    className={` w-full run-bg h-full top-0 left-0  rounded-3xl shadow-2xl flex flex-col absolute `}
                  />
                  <span className="bg-[#0000004a] rounded-3xl w-full h-full absolute top-0 left-0"></span>
                  <div className="flex z-10 p-[40px] flex-col align-text-bottom h-full w-full bg-transparent justify-end">
                    <p className="text-white font-bold text-[2.7rem]">
                      {d.title}
                    </p>
                    <span className="bg-[#ff0336] w-[50px] h-[4px]"></span>
                    <p className="text-gray-300 font-bold text-[2rem]">
                      {d.difficulty}
                    </p>
                    <p className="text-gray-300 font-bold text-[2rem]">
                      {d?.trainer?.firstName + " " + d?.trainer?.lastName}
                    </p>

                    <p className="text-gray-300 font-bold text-[1.7rem] mb-7">
                      {d.date.split(" ").splice(0, 1).join(" ") +
                        ", " +
                        d.date.split(" ")[4].split(":").splice(0, 1).join(" ") +
                        ":00"}
                    </p>

                    {d?.members?.includes(
                      JSON.parse(
                        localStorage.getItem("gymate-user-data-gedeon")
                      )?._id
                    ) ? (
                      <button
                        onClick={() =>
                          navigate("/myClasses", { replace: true })
                        }
                        className={`text-[15px] text-black bg-white text-center pt-[14px] pb-4 font-[600] w-[20rem] h-[5.5rem] uppercase hero-cta relative ml-2  `}
                      >
                        View
                        <i
                          className={`fa-arrow-right text-[#FF0336] border-2 border-white`}
                        ></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => joinHandler(d)}
                        className={`text-[15px] text-black bg-white text-center pt-[14px] pb-4 font-[600] w-[20rem] h-[5.5rem] uppercase hero-cta relative ml-2  `}
                      >
                        join now
                        <i
                          className={`fa-arrow-right text-[#FF0336] border-2 border-white`}
                        ></i>
                      </button>
                    )}
                  </div>{" "}
                </div>
              );
            })}

          <Pagination counter={counter} setCounter={setCounter} />
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Classes;
