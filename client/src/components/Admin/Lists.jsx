import React, { useContext, useEffect, useState } from "react";
import Delete from "@mui/icons-material/Delete";
import {
  useCreateBlogMutation,
  useCreateClassMutation,
  useCreateGalleryMutation,
  useCreatePriceMutation,
  useCreateScheduleMutation,
  useDeleteFactoryMutation,
  useReadFactoryQuery,
  useUpdateFactoryMutation,
} from "../../features/api/apiSlice";
import Success from "../Success/Success";
import Error from "../Error/Error";
import { Close, Image, Visibility, VisibilityOff } from "@mui/icons-material";
import { navContext } from "../../App";
import { format } from "timeago.js";
import Pending from "../Pending/Pending";
import Warning from "../Warning/Warning";
import Blog from "./Blog";
import Classes from "./Classes";
import Schedule from "./Schedule";
import Price from "./Price";

const Lists = ({ type }) => {
  let response = {};
  const context = useContext(navContext);
  const [createGalleryData, createGalleryResponse] = useCreateGalleryMutation();
  const [createBlogData, createBlogResponse] = useCreateBlogMutation();
  const [createClassData, createClassResponse] = useCreateClassMutation();
  const [createScheduleData, createScheduleResponse] =
    useCreateScheduleMutation();
  const [createPriceData, createPriceResponse] = useCreatePriceMutation();
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({ type, query: `` });

  const [updateData, updateResponse] = useUpdateFactoryMutation();
  const [deleteData, deleteResponse] = useDeleteFactoryMutation();
  const [id, setId] = useState("");
  const [images, setImages] = useState("");
  const [classTitle, setClassTitle] = useState("Body Building");
  const [classTrainer, setClassTrainer] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [scheduleClass, setScheduleClass] = useState("");
  const [scheduleTrainer, setScheduleTrainer] = useState("");
  const [day, setDay] = useState("");
  const [priceTitle, setPriceTitle] = useState("Beginners");
  const [price, setPrice] = useState("");
  const [services, setServices] = useState("");
  const [classAmount, setClassAmount] = useState("");
  const [classDifficulty, setClassDifficulty] = useState("Beginners");

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createPopup, setCreatePopUp] = useState(false);

  const createHandler = () => {
    setPending(true);
    const formData = new FormData();
    switch (type) {
      case "gallery": {
        for (let i = 0; i < images?.length; i++) {
          formData.append("galleryImage", images[i]);
        }
        formData.append("createdAt", Date.now());
        createGalleryData(formData);
        break;
      }
      case "class": {
        formData.append("classImage", images);
        formData.append("title", classTitle);
        formData.append("trainer", classTrainer);
        formData.append("amount", classAmount);
        formData.append("difficulty", classDifficulty);
        formData.append("date", new Date());
        formData.append("createdAt", Date.now());
        createClassData(formData);
        break;
      }
      case "blog": {
        formData.append("blogImage", images);
        formData.append("title", blogTitle);
        formData.append("owner", "admin");
        formData.append("date", new Date());
        formData.append("category", category);
        formData.append("type", type);
        formData.append("description", description);
        formData.append("createdAt", Date.now());
        createBlogData(formData);
        break;
      }
      case "schedule": {
        createScheduleData({
          startTime,
          finishTime,
          class: scheduleClass,
          trainer: scheduleTrainer,
          day,
          type,
          createdAt: Date.now(),
        });
        break;
      }
      case "price": {
        formData.append("title", priceTitle);
        formData.append("price", price);
        formData.append("services", services);
        formData.append("priceImage", images);
        formData.append("createdAt", Date.now());
        createPriceData(formData);
        break;
      }
      default:
        break;
    }
  };

  const updateHandler = (id, visible) => {
    setPending(true);
    updateData({ id, visible, type });
  };

  const deleteHandler = () => {
    setPending(true);
    id && deleteData({ id, type });
  };

  const waringHandler = (id) => {
    setId(id);
    setWarning(true);
  };

  useEffect(() => {
    if (createGalleryResponse) response = { ...createGalleryResponse };
  }, [createGalleryResponse]);

  useEffect(() => {
    if (createBlogResponse) response = { ...createBlogResponse };
  }, [createBlogResponse]);

  useEffect(() => {
    if (createScheduleResponse) response = { ...createScheduleResponse };
  }, [createScheduleResponse]);

  useEffect(() => {
    if (createPriceResponse) response = { ...createPriceResponse };
  }, [createPriceResponse]);

  useEffect(() => {
    if (createClassResponse) response = { ...createClassResponse };
  }, [createClassResponse]);

  useEffect(() => {
    if (updateResponse) response = { ...updateResponse };
  }, [updateResponse]);

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
        setCreatePopUp(false),
        setWarning(false))
      : null;
  }, [response]);

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <div className="h-[82vh] flex flex-col relative max1200:overflow-y-scroll  px-6 py-2 flex-[78%]">
      <div className="w-full flex items-center justify-between">
        <div className="flex min-w-[700px] mt-1 gap-2 flex-col">
          <p className="text-[20px] font-bold underline">Your Website {type}</p>
          <p className="">
            You Have a Total of {data?.data?.length}{" "}
            {type === "gallery" ? "Gallery Images" : type} and you can edit and
            organize Flawlessly.
          </p>
        </div>

        <button
          onClick={() => setCreatePopUp(true)}
          className="px-4 py-4 ease-in-out min-w-[160px] duration-150 hover:text-gray-200 text-white bg-[#ff0336]  border-gray-400 rounded-sm font-bold"
        >
          Add New {type}
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
            <p className="text-[14px] w-full py-2">
              All Fields Marked as{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>{" "}
              are Required !!
            </p>

            {type !== "schedule" && (
              <p className="text-[14px] w-full">
                {type === "gallery"
                  ? "Gallery Images (you can select up to 15 images) *"
                  : type + "Image *"}
              </p>
            )}
            {type !== "schedule" && (
              <div className="relative mt-2 w-full text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
                <input
                  onChange={(e) =>
                    type === "gallery"
                      ? setImages(e.target.files)
                      : setImages(e.target.files[0])
                  }
                  className="w-full opacity-0 h-[51px] absolute z-10 text-[14px] border border-solid border-[#e4e4e4] outline-none"
                  multiple={type === "gallery" ? true : false}
                  placeholder="Images"
                  type="file"
                ></input>
                <div className="w-full h-[51px] py-1 flex items-center px-[20px] text-[14px] outline-none">
                  <Image fontSize="large" /> Select{" "}
                  {type === "gallery" ? "Gallery Images" : type + " " + "Image"}
                </div>
              </div>
            )}

            {type === "blog" && (
              <Blog
                setDescription={setDescription}
                setCategory={setCategory}
                setBlogTitle={setBlogTitle}
              />
            )}

            {type === "schedule" && (
              <Schedule
                setStartTime={setStartTime}
                setFinishTime={setFinishTime}
                setScheduleClass={setScheduleClass}
                setScheduleTrainer={setScheduleTrainer}
                setDay={setDay}
              />
            )}

            {type === "class" && (
              <Classes
                setClassTitle={setClassTitle}
                setClassTrainer={setClassTrainer}
                setClassAmount={setClassAmount}
                setClassDifficulty={setClassDifficulty}
              />
            )}

            {type === "price" && (
              <Price
                setPriceTitle={setPriceTitle}
                setPrice={setPrice}
                setServices={setServices}
              />
            )}

            <div className="w-full mt-4 flex items-center gap-2">
              <button
                onClick={createHandler}
                className="px-4 py-4 ease-in-out bg-[#ff0336] text-white w-full duration-150 hover:text-gray-200 rounded-sm font-bold"
              >
                Create {type}
              </button>
            </div>

            <Close
              onClick={() => setCreatePopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 mt-3 min-w-[800px] gap-[4px]">
        {data ? (
          type === "gallery" ? (
            data?.data?.map((d) => {
              return (
                <div className="relative " key={d._id}>
                  <img
                    src={d.image}
                    onMouseOver={() => {}}
                    alt={type}
                    className="h-[250px] min-w-[240px] w-[400px] border border-gray-300 object-cover object-center"
                  />
                  <div className="absolute text-white top-0 z-10 h-full w-full flex items-end py-1 justify-end gap-3 px-1">
                    <div className="flex bg-gray-500 items-center justify-center rounded-md border  text-white py-1 px-1 text-[14px] gap-4">
                      <p className="border-r px-4">
                        {format(d.createdAt.toString())}
                      </p>
                      <p className="">{d.size}</p>
                      <button className="ml-10 hover:text-[#ff0336] text-white bg-gray-500 font-bold ease-in-out duration-150">
                        {d.visible === true ? (
                          <VisibilityOff
                            fontSize="large"
                            onClick={() => updateHandler(d._id, false)}
                          />
                        ) : (
                          <Visibility
                            fontSize="large"
                            onClick={() => updateHandler(d._id, true)}
                          />
                        )}
                      </button>
                      <button className="rounded-md hover:text-[#ff0336] text-white bg-gray-500 font-bold ease-in-out duration-150">
                        <Delete
                          fontSize="large"
                          onClick={() => waringHandler(d._id)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : type === "class" ? (
            data?.data?.map((d) => {
              return (
                <div
                  className={` rounded-3xl shadow-2xl object-center object-cover flex flex-col h-[46rem] relative p-[40px]`}
                >
                  <span className="bg-[#0000004a] rounded-3xl w-full h-full absolute top-0 left-0"></span>
                  <img
                    src={d.image}
                    alt="image"
                    className=" rounded-3xl w-full h-full run-bg absolute object-cover object-center top-0 left-0"
                  />

                  <div className="flex flex-col align-text-bottom absolute bottom-2 right-1 bg-[#0000004a] h-[64%] w-[90%] z-[2] justify-en">
                    <p className="text-white font-bold text-[2.7rem] mb-1">
                      Title : {d.title}
                    </p>
                    <span className="bg-[#ff0336] w-[50px] h-[4px]"></span>

                    <div className="flex flex-col p-2 gap-6 mb-14 mt-6 text-[#ffffffe1] text-[1.6rem] font-medium">
                      <p>
                        <i className="fa-regular fa-user"></i>Trainer :{" "}
                        {d?.trainer?.firstName + " " + d?.trainer?.lastName}
                      </p>
                      <p>
                        <i className="fa-regular fa-user"></i>Difficulty :{" "}
                        {d.difficulty}
                      </p>
                      <p>
                        <i className="fa-regular fa-user"></i>Amount :{" "}
                        {d.amount}
                      </p>
                      <p>
                        <i className="fa-regular fa-clock"></i> Date :{" "}
                        {d?.date?.split(" ").splice(0, 4).join(" ")}
                      </p>
                      <p>
                        <i className="fa-regular fa-clock"></i> Members :{" "}
                        {d?.members?.length}
                      </p>
                      <div className="flex gap-4">
                        <button className="hover:text-[#ff0336] text-white font-bold ease-in-out duration-150">
                          {d.visible === true ? (
                            <VisibilityOff
                              fontSize="large"
                              onClick={() => updateHandler(d._id, false)}
                            />
                          ) : (
                            <Visibility
                              fontSize="large"
                              onClick={() => updateHandler(d._id, true)}
                            />
                          )}
                        </button>
                        <button className="rounded-md hover:text-[#ff0336] text-white font-bold ease-in-out duration-150">
                          <Delete
                            fontSize="large"
                            onClick={() => waringHandler(d._id)}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : type === "schedule" ? (
            data?.data?.map((d) => {
              return (
                <div
                  className="relative bg-gray-200 rounded-sm w-full"
                  key={d._id}
                >
                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Created At</p>
                    <p className="text-[18px] text-gray-900">
                      {format(d.createdAt)}
                    </p>
                  </div>
                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Class Name</p>
                    <p className="text-[18px] text-gray-900">
                      {d?.class?.title}
                    </p>
                  </div>

                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Start Time</p>
                    <p className="text-[18px] text-gray-900">{d.startTime}</p>
                  </div>

                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Finish Time</p>
                    <p className="text-[18px] text-gray-900">{d.finishTime} </p>
                  </div>

                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Trainer</p>
                    <p className="text-[18px] text-gray-900">
                      {d?.class?.trainer}
                    </p>
                  </div>

                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Day</p>
                    <p className="text-[18px] text-gray-900">{d.day}</p>
                  </div>

                  <div className="flex p-3 flex-col gap-1">
                    <p className="text-[16px] text-gray-400">Actions</p>

                    <div className="flex gap-4">
                      <button className="hover:text-[#ff0336] text-gray-900 font-bold ease-in-out duration-150">
                        {d.visible === true ? (
                          <VisibilityOff
                            fontSize="large"
                            onClick={() => updateHandler(d._id, false)}
                          />
                        ) : (
                          <Visibility
                            fontSize="large"
                            onClick={() => updateHandler(d._id, true)}
                          />
                        )}
                      </button>
                      <button className="rounded-md hover:text-[#ff0336] text-gray-900 font-bold ease-in-out duration-150">
                        <Delete
                          fontSize="large"
                          onClick={() => waringHandler(d._id)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : type === "price" ? (
            data?.data?.map((d) => {
              return (
                <div
                  className={` rounded-3xl  shadow-2xl object-center object-cover flex flex-col h-[46rem] relative p-[40px]`}
                >
                  <span className="bg-[#0000004a] rounded-3xl w-full h-full absolute top-0 left-0"></span>
                  <img
                    src={d.image}
                    alt="image"
                    className=" rounded-3xl w-full h-full absolute object-cover object-center top-0 left-0"
                  />

                  <div className="flex flex-col align-text-bottom absolute bottom-2 right-1 bg-[#0000004a] h-[50%] w-[90%] z-[2] justify-end">
                    <p className="text-white font-bold text-[2.7rem] mb-3">
                      Title : {d.title}
                    </p>

                    <span className="bg-[#ff0336] w-[50px] h-[4px]"></span>

                    <div className="flex flex-col p-2 gap-6 mb-14 mt-6 text-[#ffffffe1] text-[1.6rem] font-medium">
                      <p>
                        <i className="fa-regular fa-user"></i>Price : {d.price}
                      </p>
                      <p>
                        <i className="fa-regular fa-clock"></i> Services :{" "}
                        {d?.services[0]?.split(",").map((e, i) => {
                          return (
                            <p>
                              {" " + i + "." + " " + e} <br />
                            </p>
                          );
                        })}
                      </p>

                      <div className="flex gap-4">
                        <button className="hover:text-[#ff0336] text-white font-bold ease-in-out duration-150">
                          {d.visible === true ? (
                            <VisibilityOff
                              fontSize="large"
                              onClick={() => updateHandler(d._id, false)}
                            />
                          ) : (
                            <Visibility
                              fontSize="large"
                              onClick={() => updateHandler(d._id, true)}
                            />
                          )}
                        </button>
                        <button className="rounded-md hover:text-[#ff0336] text-white font-bold ease-in-out duration-150">
                          <Delete
                            fontSize="large"
                            onClick={() => waringHandler(d._id)}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : type === "blog" ? (
            data?.data?.map((d) => {
              return (
                <div
                  className="relative border border-gray-400 shadow-sm"
                  key={d._id}
                >
                  <img
                    src={d.image}
                    alt="image"
                    className="w-full h-[36%] object-cover object-center"
                  />
                  <p className="font-semibold px-2">
                    By {d.owner} | {d?.date?.split(" ").splice(0, 4).join(" ")}{" "}
                    | {d.category}
                  </p>
                  <div className="h-[50%] overflow-y-scroll mt-2 px-2">
                    {d.description}
                  </div>
                  <div className="flex justify-end px-2 gap-4">
                    <button className="hover:text-[#ff0336] text-gray-900 font-bold ease-in-out duration-150">
                      {d.visible === true ? (
                        <VisibilityOff
                          fontSize="large"
                          onClick={() => updateHandler(d._id, false)}
                        />
                      ) : (
                        <Visibility
                          fontSize="large"
                          onClick={() => updateHandler(d._id, true)}
                        />
                      )}
                    </button>
                    <button className="rounded-md hover:text-[#ff0336] text-gray-900 font-bold ease-in-out duration-150">
                      <Delete
                        fontSize="large"
                        onClick={() => waringHandler(d._id)}
                      />
                    </button>
                  </div>
                </div>
              );
            })
          ) : null
        ) : (
          <p className="text-[16px] font-bold">There is no data to display</p>
        )}
      </div>
    </div>
  );
};

export default Lists;
