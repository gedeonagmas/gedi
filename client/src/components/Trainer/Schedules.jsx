import React, { useContext, useEffect, useState } from "react";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";
import { navContext } from "../../App";
import { Close, Visibility } from "@mui/icons-material";

const Schedules = () => {
  const context = useContext(navContext);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "schedule",
    query: `trainer=${
      JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))?._id
    }`,
  });

  const [detailPopup, setDetailPopup] = useState();
  const [user, setUser] = useState();
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          My Schedules{" "}
          <span className="">
            {"("}
            {data?.data?.length}
            {")"}
          </span>
        </p>
      </div>
      <table className="w-[1120px]  max-h-[90vh] border">
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <thead
          className={`${context.nightMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <th className="px-5 py-4">
            <input
              id="checkboxParent"
              type="checkbox"
              name="value"
              className="w-7 h-7"
            />{" "}
          </th>
          <th className="px-5">Image</th>
          <th className="px-5 ">Class</th>
          <th className="px-5">Difficulty</th>
          <th className="px-5">Members</th>
          <th className="px-5">Amount</th>
          <th className="px-5">Start Time</th>
          <th className="px-5">Finish Time</th>
          <th className="px-5">Day</th>
          <th className="px-5">Actions</th>
        </thead>
        {data && data?.data?.length > 0 ? (
          data?.data?.map((d, i) => {
            return (
              <tbody key={i} className="py-4 ml-5">
                <tr className="py-5 text-center mt-10 border border-l-0 border-r-0">
                  <td className="px-5 ">
                    <input
                      type="checkbox"
                      name="value"
                      id="checkboxChild"
                      className="w-7 h-7"
                    />
                  </td>
                  <td className="px-5 items-center flex justify-center  py-4">
                    <img
                      src={d?.class?.image}
                      alt="profile"
                      className="w-16 h-16  border rounded-full"
                    />
                  </td>
                  <td className="px-5 ">{d?.class?.title}</td>
                  <td className="px-5 ">{d?.class?.difficulty}</td>
                  <td className="px-5 ">{d?.class?.members?.length}</td>
                  <td className="px-5 ">{d?.class?.amount}</td>

                  <td className="px-5 ">{d.startTime}</td>
                  <td className="px-5 ">{d.finishTime}</td>
                  <td className="px-5 ">{d.day}</td>
                  <td className="px-5  py-6 flex items-center justify-center gap-3">
                    <div
                      onClick={() => {
                        setUser(d);
                        setDetailPopup(true);
                      }}
                      className="border flex gap-4 py-1 px-2 cursor-pointer hover:bg-[#ff0336] hover:text-white items-center justify-center rounded-md"
                    >
                      <Visibility fontSize="large" /> Detail
                    </div>{" "}
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody className="py-4">
            <tr className="pl-2 py-5 mt-40 border border-l-0 border-r-0">
              <td className="px-5">There is no data to display</td>
            </tr>
          </tbody>
        )}
      </table>
      {detailPopup && user && (
        <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
          <div
            onClick={() => setDetailPopup(false)}
            className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
          ></div>
          <div
            className={`relative ${
              context.nightMode ? "bg-gray-900" : "bg-white"
            } rounded-lg border w-auto -mt-32 flex flex-col gap-1 items-start justify-center py-14 z-40 px-44 shadow-lg shadow-gray-500`}
          >
            <p className="font-bold text-[16px]">Class Information </p>{" "}
            <img
              src={user?.class?.image}
              alt="profile"
              className="w-44 h-44 rounded-md run-bg border"
            />
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Title :</p>{" "}
              <p className="font-normal">{user.class?.title}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Difficulty :</p>{" "}
              <p className="font-normal">{user.class?.difficulty}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Members :</p>{" "}
              <p className="font-normal">{user.class?.members?.length}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Amount :</p>{" "}
              <p className="font-normal">{user.class?.amount} birr</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Start Time :</p>{" "}
              <p className="font-normal">{user.startTime} birr</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Finish Time :</p>{" "}
              <p className="font-normal">{user.finishTime} birr</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Day :</p>{" "}
              <p className="font-normal">{user.day}</p>
            </div>
            <Close
              onClick={() => setDetailPopup(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;
