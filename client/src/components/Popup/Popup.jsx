import React from "react";

const Popup = (props) => {
  return (
    <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
      <props.component />
    </div>
  );
};

export default Popup;
