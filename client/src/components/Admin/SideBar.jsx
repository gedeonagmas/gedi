import React, { useContext } from "react";
import {
  Class,
  Dashboard as Dash,
  Group,
  Image,
  LightMode,
  Newspaper,
  Nightlight,
  Payment,
  Person2,
  PriceChange,
  Schedule,
} from "@mui/icons-material";
import { navContext } from "../../App";

const SideBar = (props) => {
  const context = useContext(navContext);
  const focusHandler = (id) => {
    const lists = [
      "dashboard",
      "gallery",
      "classes",
      "schedule",
      "blog",
      "price",
      "users",
      "trainer",
      "payment",
      "stats",
      "notification",
      "transactionHistory",
    ];
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
        case "dashboard":
          props.data[0](true);
          break;
        case "gallery":
          props.data[1](true);
          break;
        case "classes":
          props.data[2](true);
          break;
        case "schedule":
          props.data[3](true);
          break;
        case "blog":
          props.data[4](true);
          break;
        case "price":
          props.data[5](true);
          break;
        case "users":
          props.data[6](true);
          break;
        case "trainer":
          props.data[7](true);
          break;
        case "payment":
          props.data[8](true);
          break;
        case "notification":
          props.data[9](true);
          break;
        default:
          props.data[0](true);
          break;
      }
    });
  };

  return (
    <div className="flex px-4 h-full relative border-l flex-col shadow-lg shadow-gray-500 gap-3 pt-1 w-[200px] min-w-[200px] ">
      <div className="flex flex-col gap-1 relative py-1dd">
        <p className="text-[11px] absolute top-0 right-0 justify-end self-end font-light">
          {new Date().toString().split(" ").splice(0, 4).join(" ")}
        </p>
        <p
          className={`text-[12px] mt-7 ${
            context.nightMode ? "text-gray-400" : "text-gray-900"
          } font-bold uppercase`}
        >
          {new Date().getUTCHours() > 6
            ? "Good Afternoon"
            : new Date().getUTCHours() > 12
            ? "Good Evening"
            : "Good Morning"}{" "}
          {
            JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))
              .firstName
          }
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

        <div className="gap-1 mt-5">
          <p className="text-gray-500">Main</p>
          <div
            id="dashboard"
            onClick={() => focusHandler("dashboard")}
            className="flex text-[#ff0336] font-extrabold hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Dash fontSize="" /> <p className="">Dashboard</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <p className="text-gray-500">Lists</p>
          <div
            id="gallery"
            onClick={() => focusHandler("gallery")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Image fontSize="" /> <p className="">Gallery</p>
          </div>
          <div
            id="classes"
            onClick={() => focusHandler("classes")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Class fontSize="" /> <p className="">Class</p>
          </div>
          <div
            id="schedule"
            onClick={() => focusHandler("schedule")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Schedule fontSize="" /> <p className="">Schedule</p>
          </div>
          <div
            id="blog"
            onClick={() => focusHandler("blog")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Newspaper fontSize="" /> <p className="">Blog</p>
          </div>
          <div
            id="price"
            onClick={() => focusHandler("price")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <PriceChange fontSize="" /> <p className="">Price</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <p className="text-gray-500">Useful</p>
          <div
            id="users"
            onClick={() => focusHandler("users")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Group fontSize="" /> <p className="">Users</p>
          </div>
          <div
            id="trainer"
            onClick={() => focusHandler("trainer")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Person2 fontSize="" /> <p className="">Trainer</p>
          </div>
          <div
            id="payment"
            onClick={() => focusHandler("payment")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Payment fontSize="" /> <p className="">Transactions</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <p className="text-gray-500">Information</p>

          <div
            id="notification"
            onClick={() => focusHandler("notification")}
            className="flex hover:text-[#ff0336] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Person2 fontSize="" /> <p className="">Notification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
