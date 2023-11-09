import React from "react";

const Blog = (props) => {
  return (
    <>
      <p className="text-[14px] w-full mt-2">
        Title <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <input
        onChange={(e) => props.setBlogTitle(e.target.value)}
        className="w-full py-2 px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-4"
        placeholder="Blog Title"
        type="text"
      ></input>
      <p className="text-[14px] w-full mt-2">
        Category <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <select
        onChange={(e) => props.setCategory(e.target.value)}
        name=""
        id=""
        className="w-full py-2 px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-4"
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
      <p className="text-[14px] w-full mt-2">
        Description{" "}
        <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <textarea
        onChange={(e) => props.setDescription(e.target.value)}
        name=""
        id=""
        cols="30"
        rows="10"
        className="w-full py-2 px-[20px] h-[200px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-4"
        placeholder="Description"
      ></textarea>
    </>
  );
};

export default Blog;
