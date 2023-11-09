import React from "react";
import Logo from "../images/logo/logo.svg";
import Pending from "./Pending/Pending";

const LoadingHome = () => {
  return (
    <div className="fixed top-0 gap-2 flex flex-col text-[16px] items-center justify-center left-0 z-50 bg-white w-full h-full">
      {/* <div className="w-[200px] h-[60px] relative px-2 py-2 rounded-xl bg-[#ff0335]">
        <img src={Logo} alt="GYMATE" className="w-full h-full" />
      </div> */}
      {/* <div className="w-[200px] bg-[#ff0336] rounded-md border-2 relative border-[#ff0336] text-white h-5">
        <div className={`loader bg-[#ff0446] absolute top-0 left-0`}></div>
      </div> */}
      {/* <div className="loader"></div> */}
      <Pending />
    </div>
  );
};

export default LoadingHome;
