import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReadFactoryQuery } from "../features/api/apiSlice";
import Error from "../components/Error/Error";
import Pending from "../components/Pending/Pending";
import Footer from "../components/Footer/Footer";

function Schedule() {
  const [query, setQuery] = useState(`day=Monday`);
  const [day, setDay] = useState("");

  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "schedule",
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

  useEffect(() => {
    setQuery(`day=${day}`);
    [
      "Monday",
      "all",
      "Sunday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Saturday",
      "Friday",
    ].map((e) => {
      const id = document.getElementById(e);
      id?.classList?.remove("bg-[#ff0336]", "text-white");
      id?.classList?.add("bg-white", "text-black");
      if (e === day) {
        id?.classList?.remove("bg-white", "text-black");
        id?.classList?.add("bg-[#ff0336]", "text-white");
      }
      if (day === "") {
        const idd = document.getElementById("all");
        idd?.classList?.remove("bg-white", "text-black");
        idd?.classList?.add("bg-[#ff0336]", "text-white");
      }
    });
  }, [day]);

  return (
    <>
      <section className="login-section text-center ">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Schedule by Day
          </h1>
        </div>
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <button
            onClick={() => setDay("")}
            id="all"
            className="text-[15px] font-bold text-white bg-[#ff0336] border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            All
          </button>

          <button
            onClick={() => setDay("Monday")}
            id="Monday"
            className="text-[15px] font-bold text-white bg-[#ff0336] border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            Monday
          </button>

          <button
            onClick={() => setDay("Tuesday")}
            id="Tuesday"
            className="text-[15px] bg-white text-black font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            Tuesday
          </button>

          <button
            onClick={() => setDay("Wednesday")}
            id="Wednesday"
            className="text-[15px] bg-white text-black font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            Wednesday
          </button>

          <button
            onClick={() => setDay("Thursday")}
            id="Thursday"
            className="text-[15px] bg-white text-black font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            Thursday
          </button>

          <button
            onClick={() => setDay("Friday")}
            id="Friday"
            className="text-[15px] bg-white text-black font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] hover:text-white ease-in duration-200 hover:shadow-2xl "
          >
            Friday
          </button>

          <button
            onClick={() => setDay("Saturday")}
            id="Saturday"
            className="text-[15px] bg-white text-black font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            Saturday
          </button>

          <button
            onClick={() => setDay("Sunday")}
            id="Sunday"
            className="text-[15px] bg-white text-black font-bold border-solid border border-[#d7d7d7] py-[9px] px-[32px] rounded-[23px] hover:bg-[#ff0336] ease-in duration-200 hover:shadow-2xl hover:text-white "
          >
            Sunday
          </button>
        </div>

        <div className="mt-[5rem]">
          <div className="flex flex-col gap-3">
            {data &&
              data?.data?.map((s) => {
                return (
                  <ul
                    key={s._id}
                    className="flex justify-between w-full  min800:flex-col min800:text-center"
                  >
                    <li className="py-[25px] px-[55px] bg-[#f2f2f2] w-full">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Class Name
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s?.class?.title}
                      </p>
                    </li>
                    {s?.trainer?.firstName && (
                      <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                        <p className="text-[14px] font-medium text-[#a0a0a0]">
                          Trainer
                        </p>
                        <p className="text-[18px] text-black font-bold mt-3">
                          {s?.trainer?.firstName + " " + s?.trainer?.lastName}
                        </p>
                      </li>
                    )}
                    <li className="py-[25px] px-[55px] bg-[#f2f2f2] w-full">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Day
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s.day}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Time
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s.startTime} - {s.finishTime}
                      </p>
                    </li>

                    <li className="py-[25px] self-center px-[55px] bg-[#f2f2f2] w-full text-right min800:text-center">
                      <Link
                        to="/classes"
                        className="text-white text-[15px] font-medium bg-[#555] py-[10px] px-[20px] rounded-[30px] mt-3 hover:bg-[#ff0336] ease-in duration-200 "
                      >
                        View Class
                      </Link>
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Schedule;
