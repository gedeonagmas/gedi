import React, { useEffect, useState } from "react";
import { useReadTrainerQuery } from "../../features/api/apiSlice";
import Error from "../Error/Error";
import Pending from "../Pending/Pending";

const Classes = (props) => {
  const { data, isFetching, isError, error: err } = useReadTrainerQuery();
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center justify-center w-full">
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div className="flex flex-col w-full">
          <p className="text-[14px] w-full">
            Class{" "}
            <span className="text-[#ff0336] text-[15px] font-bold">*</span>
          </p>
          <select
            onChange={(e) => props.setClassTitle(e.target.value)}
            name=""
            id=""
            className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
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
          </select>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-[14px] w-full">
            Difficulty{" "}
            <span className="text-[#ff0336] text-[15px] font-bold">*</span>
          </p>
          <select
            onChange={(e) => props.setClassDifficulty(e.target.value)}
            name=""
            id=""
            className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
          >
            <option selected value="Beginners">
              Beginners
            </option>
            <option value="Medium">Medium</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <p className="text-[14px] w-full mt-2">
        Price <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <input
        onChange={(e) => props.setClassAmount(e.target.value)}
        className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
        placeholder="Amount/month"
        type="number"
        min="0"
      ></input>

      <p className="text-[14px] w-full mt-2">
        Trainer <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <div name="" className="h-[100px] w-full overflow-y-scroll">
        {data &&
          data?.data?.map((u) => {
            return (
              <div
                className="flex items-center border rounded-md justify-start h-auto w-full px-2 gap-5 mt-2"
                key={u._id}
                id={u._id}
              >
                <input
                  onClick={() => props.setClassTrainer(u._id)}
                  type="radio"
                  name="trainer"
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
    </div>
  );
};

export default Classes;
