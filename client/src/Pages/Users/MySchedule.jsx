import React, { useEffect, useState } from "react";
import Pending from "../../components/Pending/Pending";
import Success from "../../components/Success/Success";
import Error from "../../components/Error/Error";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import { Close } from "@mui/icons-material";

const MySchedule = () => {
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({ type: "schedule" });

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [mySchedule, setMySchedule] = useState();
  const [detailPopup, setDetailPopup] = useState(false);
  const [detailData, setDetailData] = useState(false);

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    data &&
      setMySchedule(
        data?.data?.filter((c) =>
          c?.class?.members?.includes(
            JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id
          )
        )
      );
  }, [data]);

  return (
    <>
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            My Schedules
          </h1>
        </div>
        {pending && cancel && <Pending setPending={setCancel} />}
        {successMessage && success && <Success message={successMessage} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div className="mt-[2rem] p-10">
          {mySchedule &&
            mySchedule.map((s, i) => {
              return (
                <div key={s._id} className="flex flex-col gap-3 mt-5">
                  <ul className="flex justify-between w-full  min800:flex-col min800:text-center">
                    <li className="py-[25px] px-[35px] bg-[#f2f2f2] w-full">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Class Name
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s?.class?.title}
                      </p>
                    </li>

                    {s?.trainer && (
                      <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                        <p className="text-[14px] font-medium text-[#a0a0a0]">
                          Trainer
                        </p>
                        <p className="text-[18px] text-black font-bold mt-3">
                          {s?.trainer?.firstName + " " + s?.trainer?.lastName}
                        </p>
                      </li>
                    )}
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Day
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s?.day}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Difficulty
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s?.class?.difficulty}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Time
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {s?.startTime} - {s?.finishTime}
                      </p>
                    </li>

                    <li className="py-[25px] px-[55px] bg-[#f2f2f2] w-full text-right min800:text-center">
                      <button
                        onClick={() => {
                          setDetailData(s);
                          setDetailPopup(true);
                        }}
                        className="text-white  text-[15px] font-medium bg-[#555] py-[10px] px-[20px] rounded-[30px] mt-3 hover:bg-[#ff0336] ease-in duration-200 "
                      >
                        Detail View
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
        {detailPopup && detailData && (
          <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
            <div
              onClick={() => setDetailPopup(false)}
              className="fixed z-30 text-black font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
            ></div>
            <div
              className={`relative bg-white
            rounded-lg border w-auto -mt-32 text-[16px] font-semibold flex flex-col gap-1 items-start justify-center py-10 z-40 px-20 shadow-lg shadow-gray-500`}
            >
              <p className="font-bold text-[16px]">Schedule Information </p>{" "}
              <img
                src={detailData?.class?.image}
                alt="profile"
                className="w-full h-40 run-bg rounded-lg border"
              />
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Title :</p>{" "}
                <p className="font-normal">{detailData?.class?.title}</p>
              </div>
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Difficulty :</p>{" "}
                <p className="font-normal">{detailData?.class?.difficulty}</p>
              </div>
              {detailData?.class?.trainer?.firstName && (
                <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                  <p className="font-bold">Trainer :</p>{" "}
                  <p className="font-normal">
                    {detailData?.class?.trainer?.firstNam +
                      " " +
                      detailData?.class?.trainer?.lastNam}
                  </p>
                </div>
              )}
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Members :</p>{" "}
                <p className="font-normal">
                  {detailData?.class?.members?.length}
                </p>
              </div>
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Amount :</p>{" "}
                <p className="font-normal">${detailData?.class?.amount}</p>
              </div>
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Start Time :</p>{" "}
                <p className="font-normal">{detailData?.startTime}</p>
              </div>
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Finish Time :</p>{" "}
                <p className="font-normal">{detailData?.finishTime}</p>
              </div>
              <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
                <p className="font-bold">Day :</p>{" "}
                <p className="font-normal">{detailData?.day}</p>
              </div>
              <Close
                onClick={() => setDetailPopup(false)}
                fontSize="large"
                className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MySchedule;
