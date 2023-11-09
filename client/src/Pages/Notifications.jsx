import React, { useEffect, useState } from "react";
import {
  useCreateNotificationMutation,
  useGetAllUserQuery,
  useReadNotificationQuery,
  useUpdateNotificationMutation,
} from "../features/api/apiSlice";
import Pending from "../components/Pending/Pending";
import Success from "../components/Success/Success";
import Error from "../components/Error/Error";
import { format } from "timeago.js";
import { Close } from "@mui/icons-material";
import Warning from "../components/Warning/Warning";
import Footer from "../components/Footer/Footer";

const Notifications = () => {
  let response = {};
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
  } = useReadNotificationQuery({
    type: "user",
  });

  const [createData, createResponse] = useCreateNotificationMutation();
  const [deleteData, deleteResponse] = useUpdateNotificationMutation();
  const [user, setUser] = useState();
  const [id, setId] = useState();

  const [notification, setNotification] = useState();
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
    id &&
      deleteData({
        id,
        userId: JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id,
      });
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
        setDescription(""),
        setError(false))
      : null;
  }, [response]);

  useEffect(() => {
    if (data) {
      setNotification(
        data?.data?.filter((e) =>
          e.receiver.includes(
            JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id
          )
        )
      );
    }
  }, [data]);

  return (
    <>
      <section className="login-section">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Notifications {"(" + notification?.length + ")"}
          </h1>
        </div>
        {pending && cancel && <Pending setPending={setCancel} />}
        {successMessage && success && <Success message={successMessage} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        {userIsFetching && cancel && <Pending setPending={setCancel} />}
        {warning && (
          <Warning
            setWarning={setWarning}
            deleteHandler={deleteHandler}
            id={id}
          />
        )}
        <div className="w-full px-10 flex items-center justify-end mt-4">
          <button
            onClick={() => setCreatePopUp(true)}
            className="px-4 py-4 ease-in-out text-[16px] mt-2 min-w-[160px] duration-150 hover:text-gray-200 text-white bg-[#ff0336]  border-gray-400 rounded-sm font-bold"
          >
            Send New Notification
          </button>
        </div>

        <div className="flex gap-6 w-full px-4 max1200:px-40 mt-[5rem] md1200:justify-center flex-wrap">
          {notification ? (
            notification?.map((d) => {
              return (
                <div
                  key={d._id}
                  className="w-[37rem] relative min540:w-[100%] shadow-xl flex flex-col px-[3rem] py-[2rem]"
                >
                  {/* date */}
                  <img
                    src={d?.sender?.profilePicture}
                    alt="blog"
                    className="h-32 absolute top-2 right-10 w-32 rounded-full border border-gray-400 run-bg"
                  />
                  <p className="text-[15px] self-start font-bold text-[#323232] border-[#323232] border-solid rounded-full border-[1px] w-fit px-5 py-2 mb-6">
                    {format(d?.date)}
                  </p>

                  {/* title */}
                  <h3 className="text-[22px] font-bold py-5">
                    {d?.sender?.firstName + " " + d?.sender?.lastName}
                  </h3>
                  {/* desc */}
                  <p className="text-[15px] w-auto text-gray-600 font-bold">
                    {d?.description}
                  </p>
                  {/* blog cta */}
                  <button
                    onClick={() => {
                      setId(d._id);
                      setWarning(true);
                    }}
                    className={`text-[15px] hover:text-[16px] z-10 text-white bg-[#ff0336] text-center pt-[14px] mt-10 pb-4 font-[600] w-[20rem] h-[5.5rem] uppercase relative ml-2  `}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ) : (
            <div>There is no Notification To display</div>
          )}
        </div>

        {createPopup && (
          <div className="fixed z-30 text-[14px] top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
            <div
              onClick={() => setCreatePopUp(false)}
              className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
            ></div>
            <div
              className={`relative bg-white rounded-lg border min620:w-[90%] min800:w-[75%] max-h-[85vh] overflow-y-scroll md1000:w-[60%] md1200:w-[50%] max1200:w-[40%] -mt-32 flex flex-col items-center justify-center py-14 z-40 px-10 shadow-lg shadow-gray-500`}
            >
              <h3 className="text-[28px] font-bold">
                Notification Information
              </h3>
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
        <Footer />
      </section>
    </>
  );
};

export default Notifications;
