import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import { navContext } from "../App";
import Lists from "../components/Admin/Lists";
import SideBar from "../components/Admin/SideBar";
import Notification from "../components/Admin/Notification";
import Table from "../components/Admin/Table";
import Transactions from "../components/Admin/Transactions";

const AdminDashboard = () => {
  const context = useContext(navContext);
  const [dashboard, setDashboard] = useState(true);
  const [gallery, setGallery] = useState(false);
  const [classes, setClasses] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [blog, setBlog] = useState(false);
  const [price, setPrice] = useState(false);
  const [users, setUsers] = useState(false);
  const [trainer, setTrainer] = useState(false);
  const [payment, setPayment] = useState(false);
  const [notification, setNotification] = useState(false);

  const props = [
    setDashboard,
    setGallery,
    setClasses,
    setSchedule,
    setBlog,
    setPrice,
    setUsers,
    setTrainer,
    setPayment,
    setNotification,
  ];

  useEffect(() => {
    context.setNightModeIcon(true);
  }, []);

  return (
    <div className="flex text-[14px] h-[100vh] text-gray-500 flex-col w-full relative">
      <div className="bg-gray-900 w-full fixed h-32"></div>
      <div
        className={`flex mt-32 flex-col ${
          context.nightMode ? "bg-gray-900" : "bg-white"
        } justify-center items-center w-full h-auto`}
      >
        <div className="flex w-full h-[88.6vh]">
          <SideBar data={props} />
          <div className="flex flex-[78%] w-[78%] h-auto p-3 mx-4 ">
            {dashboard && (
              <Dashboard
                setUsers={setUsers}
                setTrainer={setTrainer}
                setClasses={setClasses}
                setPayment={setPayment}
                props={props}
              />
            )}
            {gallery && <Lists type="gallery" />}
            {classes && <Lists type="class" />}
            {blog && <Lists type="blog" />}
            {schedule && <Lists type="schedule" />}
            {price && <Lists type="price" />}
            {users && <Table type="user" />}
            {trainer && <Table type="trainer" />}
            {payment && <Transactions type="transaction" />}
            {notification && <Notification />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
