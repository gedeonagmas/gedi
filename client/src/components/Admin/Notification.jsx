import React, { useContext, useEffect, useState } from "react";
import Warning from "../Warning/Warning";
import Pending from "../Pending/Pending";
import Success from "../Success/Success";
import Error from "../Error/Error";
import { navContext } from "../../App";
import {
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
  useGetAllUserQuery,
  useReadNotificationQuery,
} from "../../features/api/apiSlice";
import { format } from "timeago.js";
import { Close, Delete } from "@mui/icons-material";

const Notification = () => {
  let response = {};
  const context = useContext(navContext);
  const {
    data: userData,
    isFetching: userIsFetching,
    isError: userIsError,
    error: userError,
  } = useGetAllUserQuery();
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadNotificationQuery({ type: "admin" });
  const [createData, createResponse] = useCreateNotificationMutation();
  const [deleteData, deleteResponse] = useDeleteNotificationMutation();
  const [user, setUser] = useState();
  const [id, setId] = useState();

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [createPopup, setCreatePopUp] = useState(false);
  let receiver = [
    JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))?._id,
  ];
  const [description, setDescription] = useState();

  const selectHandler = (id) => {
    if (receiver.includes(id)) {
      receiver = receiver.filter((e) => e !== id);
    } else if (!receiver.includes(id)) {
      receiver.push(id);
    }
    return receiver;
  };

  const createNotificationHandler = () => {
    setPending(true);
    createData({
      sender: JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id,
      receiver: receiver,
      date: Date.now(),
      description,
    });
  };

  const deleteHandler = () => {
    setPending(true);
    id && deleteData({ id });
  };

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    userIsError
      ? (setErrorMessage(userError?.data?.message), setError(true))
      : setError(false);
  }, [userIsError]);

  useEffect(() => {
    if (createResponse) response = { ...createResponse };
  }, [createResponse]);

  useEffect(() => {
    if (deleteResponse) response = { ...deleteResponse };
  }, [deleteResponse]);

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
        }, 3000),
        setCreatePopUp(false),
        setWarning(false),
        setError(false))
      : null;
  }, [response]);

  useEffect(() => {
    if (userData) {
      setUser(
        userData?.data?.filter(
          (u) =>
            u._id !==
            JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id
        )
      );
    }
  }, [userData]);
  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          Notifications
          <span className="">
            {"("}
            {data?.data?.length}
            {")"}
          </span>
        </p>
        <button
          onClick={() => setCreatePopUp(true)}
          className="px-4 py-4 ease-in-out min-w-[160px] duration-150 hover:text-gray-200 text-white bg-[#ff0336]  border-gray-400 rounded-sm font-bold"
        >
          Create New Notification
        </button>
      </div>
      {warning && (
        <Warning
          setWarning={setWarning}
          deleteHandler={deleteHandler}
          id={id}
        />
      )}
      {pending && cancel && <Pending setPending={setCancel} />}
      {successMessage && success && <Success message={successMessage} />}
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      {userIsFetching && cancel && <Pending setPending={setCancel} />}

      {createPopup && (
        <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
          <div
            onClick={() => setCreatePopUp(false)}
            className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
          ></div>
          <div
            className={`relative ${
              context.nightMode ? "bg-gray-900" : "bg-white"
            } rounded-lg border min620:w-[90%] min800:w-[75%] max-h-[85vh] overflow-y-scroll md1000:w-[60%] md1200:w-[50%] max1200:w-[40%] -mt-32 flex flex-col items-center justify-center py-14 z-40 px-10 shadow-lg shadow-gray-500`}
          >
            <h3 className="text-[28px] font-bold">Notification Information</h3>
            <p className="text-[14px] self-start mt-2">
              Message{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <textarea
              name=""
              onChange={(e) => setDescription(e.target.value)}
              id=""
              cols="30"
              rows="6"
              placeholder="message"
              className="w-full border focus:outline-none px-2 rounded-md"
            ></textarea>
            <p className="text-[14px] self-start mt-4">
              Select Receivers{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <div name="" className="h-[250px] mt-5 w-full overflow-y-scroll">
              {user &&
                user?.map((u) => {
                  return (
                    <div
                      className="flex items-center border rounded-md justify-start h-auto w-full py-5 px-2 gap-5 mt-2"
                      value={u._id}
                      id={u._id}
                    >
                      <input
                        onClick={() => selectHandler(u._id)}
                        type="checkbox"
                        name=""
                        id=""
                        className="w-7 h-7"
                      />
                      <img
                        src={u.profilePicture}
                        alt="image"
                        className="w-14 h-14 rounded-full border"
                      />
                      <div className="">
                        <p className="">{u.userName}</p>
                        <p className="">{u.email}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <button
              onClick={createNotificationHandler}
              type="submit"
              className="text-white self-start bg-[#ff0336] rounded-sm w-52 py-[15px] px-[30px] font-bold text-[16px] uppercase mt-6"
            >
              Send
            </button>
            <Close
              onClick={() => setCreatePopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 mt-3 min-w-[1110px] gap-[4px]">
        {data &&
          data?.data?.map((d) => {
            return (
              <div className="min-w-[350px] h-[350px] flex flex-col rounded-lg border shadow-md shadow-gray-500">
                <div className="flex  justify-between p-4 min-w-[350px]">
                  <div className="flex w-full text-[12px] flex-col gap-1">
                    <p className="text-[14px] font-bold underline">Sender</p>
                    <img
                      src={d?.sender?.profilePicture}
                      alt="image"
                      className="w-14 h-14 rounded-full border"
                    />
                    <p className="">
                      First Name :{" "}
                      <span className="font-semibold">
                        {d?.sender?.firstName}
                      </span>
                    </p>
                    <p className="">
                      Last Name :{" "}
                      <span className="font-semibold">
                        {d?.sender?.lastName}
                      </span>
                    </p>
                    <p className="">
                      User Name :{" "}
                      <span className="font-semibold">
                        {d?.sender?.userName}
                      </span>
                    </p>
                    <p className="">
                      Email :{" "}
                      <span className="font-semibold">{d?.sender?.email}</span>
                    </p>
                  </div>

                  <div className="flex w-full text-[12px] flex-col gap-1">
                    <p className="text-[14px] font-bold underline">
                      Receivers {"(" + d?.receiver?.length + ")"}
                    </p>
                    <div className="w-full h-[115px] overflow-y-scroll">
                      {d?.receiver?.map((r) => {
                        return (
                          <div className="flex rounded-md border mt-1 shadow-sm px-2 py-1 gap-2">
                            <img
                              src={r?.profilePicture}
                              alt="image"
                              className="w-14 h-14 rounded-full border"
                            />
                            <div className="flex flex-col">
                              <p className="">{r?.firstName}</p>
                              <p className="">{r?.email}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <p className="px-2 py-2 self-end">{format(d?.date)}</p>
                <div className="overflow-y-scroll w-full h-[110px]">
                  <p className="px-2 py-2">{d?.description}</p>
                </div>
                <div
                  onClick={() => {
                    setId(d?._id);
                    setWarning(true);
                  }}
                  className="self-end hover:bg-[#ff0336] flex items-center justify-center gap-2 mt-2 hover:text-white border rounded-md py-1 px-2 cursor-pointer mx-2"
                >
                  <Delete fontSize="large" /> <span>Delete</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notification;
