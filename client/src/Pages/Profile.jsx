import React, { useContext, useEffect, useState } from "react";
import {
  useChangePasswordMutation,
  useReadProfileInfoQuery,
  useUpdateProfileInfoMutation,
  useUpdateProfilePictureMutation,
} from "../features/api/apiSlice";
import Error from "../components/Error/Error";
import Success from "../components/Success/Success";
import { navContext } from "../App";
import { useNavigate } from "react-router-dom";
import Pending from "../components/Pending/Pending";

const Profile = () => {
  const navigate = useNavigate();
  const context = useContext(navContext);
  let serverResponse = {};
  const { data, isFetching, isError, error: err } = useReadProfileInfoQuery();

  const [infoData, infoResponse] = useUpdateProfileInfoMutation();

  const [profilePicData, profilePicResponse] =
    useUpdateProfilePictureMutation();

  const [passwordData, passwordResponse] = useChangePasswordMutation();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pass, setPass] = useState(false);

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    setFirstName(data?.data?.firstName);
    setLastName(data?.data?.lastName);
    setEmail(data?.data?.email);
    setUserName(data?.data?.userName);
    setPhone(data?.data?.phone);
    setCity(data?.data?.city);
    setProfilePicture(data?.data?.profilePicture);
  }, [data]);

  const infoUpdateHandler = () => {
    setPass(false);
    setPending(true);
    infoData({
      firstName,
      lastName,
      email,
      userName,
      role: "user",
      phone,
      city,
      id: data?.data?._id,
    });
  };

  const profilePicUpdateHandler = () => {
    setPass(false);
    setPending(true);
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("id", data?.data?._id);
    profilePicData(formData);
  };

  const passwordUpdateHandler = () => {
    setPass(true);
    setPending(true);
    passwordData({
      currentPassword,
      newPassword,
      confirmPassword,
      id: data?.data?._id,
    });
  };

  useEffect(() => {
    if (infoResponse) {
      serverResponse = { ...infoResponse };
    }
  }, [infoResponse]);

  useEffect(() => {
    if (profilePicResponse) {
      serverResponse = { ...profilePicResponse };
    }
  }, [profilePicResponse]);

  useEffect(() => {
    if (passwordResponse) {
      serverResponse = { ...passwordResponse };
    }
  }, [passwordResponse]);

  useEffect(() => {
    serverResponse?.status === "pending" ? setPending(true) : setPending(false);

    serverResponse?.status === "rejected"
      ? (setErrorMessage(serverResponse?.error?.data?.message), setError(true))
      : null;

    serverResponse?.status === "fulfilled" && !pass
      ? (localStorage.removeItem("gymate-user-data-gedeon"),
        localStorage.setItem(
          "gymate-user-data-gedeon",
          JSON.stringify(serverResponse?.data?.data)
        ),
        setSuccessMessage(serverResponse?.data.message),
        setPending(false),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 2000),
        setPass(false))
      : null;

    serverResponse?.status === "fulfilled" && pass
      ? (localStorage.removeItem("gymate-user-data-gedeon"),
        localStorage.removeItem("gymate-jwt-data-gedeon"),
        setSuccessMessage(serverResponse?.data.message),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          context.setSetting(false);
          context.setLogin(true);
          navigate("/login", { replace: true });
        }, 4000),
        setPass(false))
      : null;
  }, [serverResponse]);

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <section className="login-section pb-32">
      <div className="login-banner relative justify-center flex">
        <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
          Profile Info
        </h1>
      </div>
      {pending && cancel && <Pending setPending={setCancel} />}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {data?.data ? (
        <div className="pb-[10rem] pt-[2rem] flex flex-col items-center justify-center page-padding">
          {successMessage && success && <Success message={successMessage} />}
          <div className="flex w-[60%] flex-col pt-[3px] pr-[50px] pb-[5px] pl-[45px] bg-[#f8f8f8] relative md1000:w-[65%] md1000:flex text-gray-500  md1000:flex-col md1000:mx-auto min800:w-[90%] min620:w-full">
            <h3 className="text-[28px] font-bold mb-14">Your Information</h3>
            <span className="bg-[#ff0336] w-[50px] h-[4px] absolute top-[47px]"></span>

            <p className="text-[14px] mt-2">
              First Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="First Name"
              type="text"
              value={firstName}
            ></input>
            <p className="text-[14px]">
              Last Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Last Name"
              type="text"
              value={lastName}
            ></input>
            <p className="text-[14px]">
              Email{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Email"
              type="email"
              value={email}
            ></input>
            <p className="text-[14px]">
              User Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="User Name"
              type="text"
              value={userName}
            ></input>
            <p className="text-[14px]">
              City{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="City"
              type="text"
              value={city}
            ></input>
            <p className="text-[14px]">
              Phone{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Phone"
              type="text"
              value={phone}
            ></input>
            <div className="w-full flex items-center gap-2">
              <button
                onClick={infoUpdateHandler}
                type="submit"
                className="text-white bg-[#ff0336] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
              >
                Update
              </button>
            </div>
          </div>
          {/* profile picture */}
          <div className="flex w-[60%] my-32 border-t-2 border-gray-300 border-dotted flex-col pt-[3px] pr-[50px] pb-[5px] pl-[45px] bg-[#f8f8f8] relative md1000:w-[65%] md1000:flex text-gray-500  md1000:flex-col md1000:mx-auto min800:w-[90%] min620:w-full">
            <h3 className="text-[28px] font-bold mb-14">Profile Picture</h3>
            <span className="bg-[#ff0336] w-[50px] h-[4px] absolute top-[47px]"></span>

            <p className="text-[14px]">Profile Picture</p>
            <div className="relative w-full h-[100px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
              <input
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full opacity-0 h-[100px] absolute z-10 text-[14px] border border-solid border-[#e4e4e4] outline-none"
                placeholder="profile picture"
                type="file"
              ></input>
              <div className="w-full h-[100px] py-2 flex gap-4 items-center text-[14px] outline-none">
                <img
                  src={data.data.profilePicture}
                  alt="profile picture"
                  className="h-[100px] w-[100px] rounded-full"
                />{" "}
                Click To Select New Profile Picture
              </div>

              <div className="w-full flex items-center gap-2">
                <button
                  onClick={profilePicUpdateHandler}
                  type="submit"
                  className="text-white bg-[#ff0336] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          {/* update password */}
          <div className="flex w-[60%] my-20 pb-20 border-t-2 border-gray-300 border-dotted flex-col pt-[3px] pr-[50px] pl-[45px] bg-[#f8f8f8] relative md1000:w-[65%] md1000:flex text-gray-500  md1000:flex-col md1000:mx-auto min800:w-[90%] min620:w-full">
            <h3 className="text-[28px] font-bold mb-14">Change Password</h3>
            <span className="bg-[#ff0336] w-[50px] h-[4px] absolute top-[47px]"></span>

            <div className="relative w-full h-[51px] text-[14px]  outline-none mb-8">
              <p className="text-[14px]">Current Password</p>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="Current Password"
                type="text"
              ></input>
              <p className="text-[14px]">New Password</p>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="New Password"
                type="text"
              ></input>
              <p className="text-[14px]">Confirm Password</p>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="Confirm Password"
                type="text"
              ></input>

              <div className="w-full flex items-center gap-2">
                <button
                  onClick={passwordUpdateHandler}
                  type="submit"
                  className="text-white bg-[#ff0336] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Profile;
