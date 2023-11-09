import React, { useEffect, useState } from "react";
import Pending from "../../components/Pending/Pending";
import Success from "../../components/Success/Success";
import Error from "../../components/Error/Error";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";

const MyClass = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(`page=1&limit=9&visible=true`);

  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({ type: "class", query });

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [myClass, setMyClass] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    data &&
      setMyClass(
        data?.data?.filter((c) =>
          c?.members?.includes(
            JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id
          )
        )
      );
  }, [data]);

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter > 3) setCounter(3);
    if (counter < 1) setCounter(1);
    setQuery(`page=${counter}&limit=9&visible=true`);
  }, [counter]);

  return (
    <>
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            My Classes
          </h1>
        </div>
        {pending && cancel && <Pending setPending={setCancel} />}
        {successMessage && success && <Success message={successMessage} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div
          className={`container relative gap-12 page-padding py-[10rem] w-full md1000:grid-cols-2 min620:grid-cols-1  grid-cols-3 grid-rows-3 text-left items-center justify-center grid`}
        >
          {myClass &&
            myClass.map((d) => {
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

                  <div className="flex z-10 p-[40px] gap-1 flex-col align-text-bottom h-full w-full bg-transparent justify-end">
                    <p className="text-white font-bold text-[2.7rem]">
                      {d.title}
                    </p>
                    <span className="bg-[#ff0336] w-[50px] mb-5 h-[4px]"></span>
                    <div className="flex text-[16px] text-[#ffffffe1]  gap-7">
                      <p className="">Trainer: </p>
                      <p>
                        {d?.trainer?.firstName + " " + d?.trainer?.lastName}
                      </p>
                    </div>
                    <div className="flex text-[16px] text-[#ffffffe1]  gap-7">
                      <p className="">Difficulty: </p>
                      <p>{d.difficulty}</p>
                    </div>
                    <div className="flex text-[16px] text-[#ffffffe1]  gap-7">
                      <p className="">Date: </p>
                      <p className="">
                        {d.date.split(" ").splice(0, 4).join(" ")}
                      </p>
                    </div>
                    <div className="flex text-[16px] text-[#ffffffe1]  gap-7">
                      <p className="">Amount: </p>
                      <p>${d.amount}</p>
                    </div>

                    <div className="flex text-[16px] text-[#ffffffe1]  gap-7">
                      <p className="">Members: </p>
                      <p>{d?.members?.length}</p>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/mySchedules", { replace: true })
                      }
                      className={`text-[15px] mt-6 text-black bg-white text-center pt-[14px] pb-4 font-[600] w-[20rem] h-[5.5rem] uppercase hero-cta relative   `}
                    >
                      Schedules
                      <i
                        className={`fa-arrow-right text-[#FF0336] border-2 border-white`}
                      ></i>
                    </button>
                  </div>
                </div>
              );
            })}
          <Pagination counter={counter} setCounter={setCounter} />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default MyClass;
