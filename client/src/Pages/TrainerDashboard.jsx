import React, { useContext, useEffect, useState } from "react";
import SideBar from "../components/Trainer/SideBar";
import { navContext } from "../App";
import Students from "../components/Trainer/Students";
import Schedules from "../components/Trainer/Schedules";
import Classes from "../components/Trainer/Classes";

const TrainerDashboard = () => {
  const context = useContext(navContext);
  const [student, setStudent] = useState(true);
  const [classes, setClasses] = useState(false);
  const [schedule, setSchedule] = useState(false);

  const props = [setStudent, setClasses, setSchedule];

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
        <div className="flex w-full">
          <SideBar data={props} />
          <div className="flex flex-[78%] w-[78%] h-auto p-3 mx-4 ">
            {student && <Students />}
            {schedule && <Schedules />}
            {classes && <Classes />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
