import React, { useEffect, useState } from "react";
import { useReadFactoryQuery } from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";

const Schedule = (props) => {
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({ type: "class", query: "" });

  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <>
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      <p className="text-[14px] w-full mt-2">
        Class <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <div name="" className="h-[250px] mt-5 w-full overflow-y-scroll">
        {data &&
          data?.data?.map((u, i) => {
            return (
              <div
                className="flex items-center border rounded-md justify-start h-auto w-full py-5 px-2 gap-5 mt-2"
                key={i}
              >
                <input
                  onClick={() => {
                    props.setScheduleClass(u?._id);
                    props.setScheduleTrainer(u?.trainer?._id);
                  }}
                  type="radio"
                  name=""
                  id=""
                  className="w-7 h-7"
                />
                <img
                  src={u?.image}
                  alt="image"
                  className="w-14 h-14 rounded-full border"
                />
                <div className="">
                  <p className="">{u?.title}</p>
                  <p className="">
                    {u?.trainer.firstName + " " + u?.trainer.lastName}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <p className="text-[14px] w-full mt-2">
        Start Time{" "}
        <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <input
        onChange={(e) => props.setStartTime(e.target.value)}
        className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
        placeholder="Start Time"
        min={new Date()}
        type="time"
      ></input>
      <p className="text-[14px] w-full mt-2">
        Finish Time{" "}
        <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <input
        onChange={(e) => props.setFinishTime(e.target.value)}
        className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
        placeholder="Finish Time"
        min={new Date()}
        type="time"
      ></input>

      <p className="text-[14px] w-full mt-2">
        Day <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <select
        onChange={(e) => props.setDay(e.target.value)}
        name=""
        id=""
        className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
      >
        <option selected disabled value="Select Trainer">
          Select Day
        </option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
    </>
  );
};

export default Schedule;
