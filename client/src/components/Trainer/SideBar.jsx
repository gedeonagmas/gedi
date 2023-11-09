import React, { useContext } from "react";
import {
  Class,
  LightMode,
  Nightlight,
  People,
  Schedule,
} from "@mui/icons-material";
import { navContext } from "../../App";

const SideBar = (props) => {
  const context = useContext(navContext);
  const focusHandler = (id) => {
    const lists = ["students", "schedules", "classes"];
    lists.map((e) => {
      const val = document.getElementById(e);
      val?.classList?.remove("text-[#ff0336]");
      val?.classList?.remove("font-extrabold");
      if (e === id) {
        val?.classList?.add("font-extrabold");
        val?.classList?.add("text-[#ff0336]");
      }
    });

    props.data.map((d) => {
      d(false);
      switch (id) {
        case "students":
          props.data[0](true);
          break;
        case "classes":
          props.data[1](true);
          break;
        case "schedules":
          props.data[2](true);
          break;
        default:
          props.data[0](true);
          break;
      }
    });
  };

  return (
    <div className="flex px-4 h-auto relative border-l flex-col shadow-lg shadow-gray-500 gap-3 pt-1 w-[200px] min-w-[200px] ">
      <div className="flex flex-col gap-1 relative py-3">
        <p className="text-[14px] absolute top-0 right-0 justify-end self-end font-light">
          {new Date().toString().split(" ").splice(0, 4).join(" ")}
        </p>
        <p
          className={`text-[16px] mt-10 ${
            context.nightMode ? "text-gray-400" : "text-gray-900"
          } font-bold uppercase`}
        >
          {new Date().getUTCHours() > 6
            ? "Good Afternoon"
            : new Date().getUTCHours() > 12
            ? "Good Evening"
            : "Good Morning"}{" "}
          {JSON.parse(localStorage.getItem("gymate-user-data-gedeon")).firstName}
        </p>
      </div>

      <div className="h-[79vh] pb-9">
        <div className="gap-1">
          <p className="text-gray-500">Night Mode</p>
          <div className="flex text-gray-500 font-extrabold cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2">
            <div
              onClick={() => context.setNightMode(true)}
              className="h-10 w-10 hover:text-[#ff0336] cursor-pointer rounded-md mt-2 text-white flex items-center justify-center border bg-gray-900 border-gray-300"
            >
              <Nightlight fontSize="" />
            </div>
            <div
              onClick={() => context.setNightMode(false)}
              className="h-10 hover:text-[#ff0336] cursor-pointer w-10 text-black rounded-md mt-2 flex items-center justify-center border bg-white border-gray-500"
            >
              <LightMode fontSize="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <p className="text-gray-500">Lists</p>
          <div
            id="students"
            onClick={() => focusHandler("students")}
            className="flex text-[#ff0336] font-extrabold hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <People fontSize="" /> <p className="">Students</p>
          </div>
          <div
            id="classes"
            onClick={() => focusHandler("classes")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Class fontSize="" /> <p className="">Classes</p>
          </div>
          <div
            id="schedules"
            onClick={() => focusHandler("schedules")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Schedule fontSize="" /> <p className="">Schedules</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
