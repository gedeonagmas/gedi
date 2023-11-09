import React, { useContext, useEffect, useState } from "react";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";
import Success from "../Success/Success";
import { navContext } from "../../App";
import { Close, Visibility } from "@mui/icons-material";

const Students = () => {
  const context = useContext(navContext);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "class",
    query: `sort=createdAt&type=trainer&visible=true&trainer[eq]=${
      JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))?._id
    }`,
  });

  const [detailPopup, setDetailPopup] = useState();
  const [studentData, setStudentData] = useState();
  const [userData, setUserData] = useState();
  const [user, setUser] = useState();
  const [cancel, setCancel] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    let arr = [];
    const arr2 = [];
    if (data) {
      data?.data?.map((e) => e.members?.map((m) => arr.push(m)));
    }
    setUserData(arr);
  }, [data]);

  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          My Students{" "}
          <span className="">
            {"("}
            {userData?.length}
            {")"}
          </span>
        </p>
      </div>
      <table className="w-[1120px]  max-h-[90vh] border">
        {successMessage && success && <Success message={successMessage} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <thead
          className={`${context.nightMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <th className="px-5 py-4">
            <input
              // onClick={checkBoxHandler}
              id="checkboxParent"
              type="checkbox"
              name="value"
              className="w-7 h-7"
            />{" "}
          </th>
          <th className="px-5">Profile</th>
          <th className="px-5 ">First Name</th>
          <th className="px-5">Last Name</th>
          <th className="px-5">User Name</th>
          <th className="px-5">Email</th>
          <th className="px-5">Phone</th>
          <th className="px-5">City</th>
          <th className="px-5">Payment</th>
          <th className="px-5">Class</th>
          <th className="px-5">Actions</th>
        </thead>
        {userData && userData.length > 0 ? (
          userData?.map((d, i) => {
            return (
              <tbody key={i} className="py-4">
                <tr className="py-5 text-center mt-10 border border-l-0 border-r-0">
                  <td className="px-5">
                    <input
                      type="checkbox"
                      name="value"
                      id="checkboxChild"
                      className="w-7 h-7"
                    />
                  </td>
                  <td className="px-5 flex items-center justify-center py-4">
                    <img
                      src={d.profilePicture}
                      alt="profile"
                      className="w-16 h-16 border rounded-full"
                    />
                  </td>
                  <td className="px-5">{d.firstName}</td>
                  <td className="px-5">{d.lastName}</td>
                  <td className="px-5">{d.userName}</td>
                  <td className="px-5">{d.email}</td>
                  <td className="px-5">{d.phone}</td>
                  <td className="px-5">{d.city}</td>

                  <td
                    className={`px-5 ${
                      d.paymentStatus === "Payed"
                        ? "text-emerald-500"
                        : "text-yellow-500"
                    } `}
                  >
                    {d.paymentStatus}
                  </td>
                  <td className="px-5">{data?.data[i]?.title}</td>
                  <td className="px-5 py-6 flex items-center justify-center gap-3">
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
            <p className="font-bold text-[16px]">Profile Information </p>{" "}
            <img
              src={user.profilePicture}
              alt="profile"
              className="w-32 h-32 rounded-full border"
            />
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">First Name :</p>{" "}
              <p className="font-normal">{user.firstName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Last Name :</p>{" "}
              <p className="font-normal">{user.lastName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">User Name :</p>{" "}
              <p className="font-normal">{user.userName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Email :</p>{" "}
              <p className="font-normal">{user.email}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Phone :</p>{" "}
              <p className="font-normal">{user.phone}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">City :</p>{" "}
              <p className="font-normal">{user.city}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Payment Status :</p>{" "}
              <p className="font-normal">{user.paymentStatus}</p>
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

export default Students;
