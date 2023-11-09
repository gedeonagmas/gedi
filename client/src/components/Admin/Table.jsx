import React, { useContext, useEffect, useState } from "react";
import VisibilityOn from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useSignupMutation,
} from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";
import Success from "../Success/Success";
import Warning from "../Warning/Warning";
import { navContext } from "../../App";
import { Close, Image, Visibility, VisibilityOff } from "@mui/icons-material";

const Table = ({ type }) => {
  let response = {};
  const context = useContext(navContext);
  const { data, isFetching, isError, error: err } = useGetAllUserQuery();
  const [createTrainerData, createTrainerResponse] = useSignupMutation();
  const [deleteData, deleteResponse] = useDeleteUserMutation();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [createPopup, setCreatePopUp] = useState(false);
  const [detailPopup, setDetailPopUp] = useState(false);
  const [id, setId] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [difficulty, setDifficulty] = useState("Beginners");
  const [classType, setClassType] = useState("Advanced");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passVisibility, setPassVisibility] = useState(true);
  const [confPassVisibility, setConfPassVisibility] = useState(true);

  const createTrainerHandler = () => {
    setPending(true);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("profilePicture", profilePicture);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("role", "trainer");
    createTrainerData(formData);
  };

  const visibilityHandler = (id, type, field, val) => {
    field === "conf"
      ? type === "hide"
        ? setConfPassVisibility(true)
        : setConfPassVisibility(false)
      : type === "hide"
      ? setPassVisibility(true)
      : setPassVisibility(false);

    const aa = document.getElementById(id);
    aa.setAttribute("type", val);
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
    if (createTrainerResponse) response = { ...createTrainerResponse };
  }, [createTrainerResponse]);

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
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 3000),
        setDetailPopUp(false),
        setCreatePopUp(false),
        setWarning(false))
      : null;
  }, [response]);

  useEffect(() => {
    if (data) {
      setUserData(data?.data?.filter((d) => d.role === type));
    }
  }, [data]);

  const [checked, setChecked] = useState(false);

  const checkBoxHandler = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const child = document.getElementById("checkboxChild");
    checked
      ? child?.setAttribute("checked", checked)
      : child?.removeAttribute("checked");
  }, [checked]);

  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          {type}s{" "}
          <span className="">
            {"("}
            {userData?.length}
            {")"}
          </span>
        </p>
        {type === "trainer" && (
          <button
            onClick={() => setCreatePopUp(true)}
            className="px-4 py-4 ease-in-out min-w-[160px] duration-150 hover:text-gray-200 text-white bg-[#ff0336]  border-gray-400 rounded-sm font-bold"
          >
            Add New Trainer
          </button>
        )}
      </div>
      <table className="w-[1120px]  max-h-[90vh] border">
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
        <thead
          className={`${context.nightMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <th className="px-5 py-4">
            <input
              onClick={checkBoxHandler}
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
          <th className="px-5">Actions</th>
        </thead>
        {userData && userData.length > 0 ? (
          userData?.map((d) => {
            return (
              <tbody key={d._id} className="py-4">
                <tr className="py-5 mt-10 text-center border border-l-0 border-r-0">
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

                  <td className="px-5 py-10 flex items-center text-center self-center justify-center gap-3">
                    <div
                      onClick={() => {
                        setUser(d);
                        setDetailPopUp(true);
                      }}
                      className="border flex gap-4 py-1 px-2 cursor-pointer hover:bg-[#ff0336] hover:text-white items-center justify-center rounded-md"
                    >
                      <VisibilityOn fontSize="large" /> Detail
                    </div>{" "}
                    <div
                      onClick={() => {
                        setId(d._id);
                        setWarning(true);
                      }}
                      className="border flex gap-2 py-1 px-2 cursor-pointer hover:bg-[#ff0336] hover:text-white items-center justify-center rounded-md"
                    >
                      <Delete fontSize="large" /> Delete
                    </div>
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
            onClick={() => setDetailPopUp(false)}
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
              <p className="font-bold">Phone :</p>{" "}
              <p className="font-normal">{user.phone}</p>
            </div>
            <Close
              onClick={() => setDetailPopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
      {createPopup && (
        <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
          <div
            onClick={() => setCreatePopUp(false)}
            className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
          ></div>
          <div
            className={`z-40 -top-14 py-5 ${
              context.nightMode ? "bg-gray-900" : "bg-white"
            } h-[85vh] relative px-10 min620:w-[90%] min800:w-[75%] max-h-[85vh] overflow-y-scroll md1000:w-[60%] md1200:w-[50%] max1200:w-[40%] rounded-md`}
          >
            <h3 className="text-[28px] font-bold">Trainer Information</h3>
            <span className="bg-[#ff0336] w-[50px] h-[4px] absolute top-[47px]"></span>
            <p className="text-[14px] py-2">
              All Fields Marked as{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>{" "}
              are Required !!
            </p>
            <p className="text-[14px] mt-2">
              First Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="First Name"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Last Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Last Name"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Email{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Email"
              type="email"
            ></input>
            <p className="text-[14px] mt-2">
              User Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="User Name"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              City{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="City"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Phone{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Phone"
              type="text"
            ></input>
            {/* <p className="text-[14px] mt-2">
              Difficulty{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
            >
              <option disabled>Select Difficulty</option>
              <option selected value="Beginners">
                Beginners
              </option>
              <option value="Medium">Medium</option>
              <option value="Advanced">Advanced</option>
            </select>
            <p className="text-[14px] mt-2">
              Class{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <select
              onChange={(e) => setClassType(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
            >
              <option selected value="Body Building">
                Body Building
              </option>
              <option value="Boxing">Boxing</option>
              <option value="Running">Running</option>
              <option value="Fitness">Fitness</option>
              <option value="Yoga">Yoga</option>
              <option value="Workout">Workout</option>
              <option value="Karate">Karate</option>
              <option value="Meditation">Meditation</option>
              <option value="Cycling">Cycling</option>
            </select> */}
            <p className="text-[14px] mt-2">
              Password{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-1">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="pass"
                className="w-full h-20 py-4 px-2 rounded-md mt-2 focus:outline-none"
                placeholder="Password"
                type="password"
              ></input>
              {passVisibility && (
                <Visibility
                  onClick={() =>
                    visibilityHandler("pass", "visible", "pass", "text")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
              {!passVisibility && (
                <VisibilityOff
                  onClick={() =>
                    visibilityHandler("pass", "hide", "pass", "password")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
            </div>
            <p className="text-[14px] mt-2">
              Confirm Password{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-1">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="conf"
                className="w-full h-20 py-4 px-2 rounded-md mt-2 focus:outline-none"
                placeholder="Confirm Password"
                type="password"
              ></input>
              {confPassVisibility && (
                <Visibility
                  onClick={() =>
                    visibilityHandler("conf", "visible", "conf", "text")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
              {!confPassVisibility && (
                <VisibilityOff
                  onClick={() =>
                    visibilityHandler("conf", "hide", "conf", "password")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
            </div>
            <p className="text-[14px] mt-2">
              Profile Picture{"("}optional{")"}
            </p>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-1">
              <input
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full opacity-0 h-[51px] absolute z-10 text-[14px] border border-solid border-[#e4e4e4] outline-none"
                placeholder="Confirm Password"
                type="file"
              ></input>
              <div className="w-full h-[51px] py-1 flex items-center px-[20px] text-[14px] outline-none">
                <Image fontSize="large" /> Select Profile Picture
              </div>
            </div>
            <button
              onClick={createTrainerHandler}
              type="submit"
              className="text-white bg-[#ff0336] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
            >
              Create
            </button>
            <Close
              onClick={() => setCreatePopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
