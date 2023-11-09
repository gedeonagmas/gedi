import { People, Person, Image, Class } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import HeaderBox from "./HeaderBox";
import Chart from "./Chart";
import BarGraph from "./BarGraph";
import { useReadClassTransactionUsersQuery } from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";

const Dashboard = (props) => {
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadClassTransactionUsersQuery();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <div className="w-full relative px-2 mt-3">
      {isFetching && cancel && <Pending setPending={setCancel} />}
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      <div className="flex w-full min-w-[1120px] gap-7 justify-between">
        <HeaderBox
          title="Users"
          percent="20"
          number={data?.users ? data.users : 20}
          icon={People}
          color="text-red-500"
          bg="bg-red-200"
          goto={props.setUsers}
          props={props.props}
        />
        <HeaderBox
          title="Trainers"
          percent="40"
          number={data?.trainers ? data.trainers : 10}
          icon={Person}
          color="text-blue-500"
          bg="bg-blue-200"
          goto={props.setTrainer}
          props={props.props}
        />
        <HeaderBox
          title="Transactions"
          percent="30"
          number={data?.transactions ? data.transactions : 2}
          icon={Image}
          color="text-yellow-500"
          bg="bg-yellow-200"
          goto={props.setPayment}
          props={props.props}
        />
        <HeaderBox
          title="Classes"
          percent="10"
          number={data?.classes ? data.classes : 9}
          icon={Class}
          color="text-emerald-500"
          bg="bg-emerald-200"
          goto={props.setClasses}
          props={props.props}
        />
      </div>
      <div className="flex w-[55.6%] h-auto shadow-xl absolute bottom-4 min-w-[1120px] mt-2 gap-2">
        <Chart />
        <BarGraph />
      </div>
    </div>
  );
};

export default Dashboard;
