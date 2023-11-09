import React from "react";

const Price = (props) => {
  return (
    <>
      <p className="text-[14px] w-full mt-2">
        Title <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <select
        onChange={(e) => props.setPriceTitle(e.target.value)}
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
      <p className="text-[14px] w-full mt-2">
        Price <span className="text-[#ff0336] text-[15px] font-bold">*</span>
      </p>
      <input
        onChange={(e) => props.setPrice(e.target.value)}
        className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
        placeholder="Price"
        type="number"
        min="0"
      ></input>
      <p className="text-[14px] w-full mt-2">
        Services{" "}
        <span className="text-[#ff0336] text-[15px] font-bold">
          * use a comma (' , ') separator for multiple service
        </span>
      </p>
      <input
        onChange={(e) => props.setServices(e.target.value)}
        className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
        placeholder="Services"
        type="text"
      ></input>
    </>
  );
};

export default Price;
