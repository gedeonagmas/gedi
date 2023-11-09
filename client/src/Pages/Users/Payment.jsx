import React, { useContext, useEffect, useState } from "react";
import { useReadMyDataQuery } from "../../features/api/apiSlice";
import { Close, Warning } from "@mui/icons-material";
import Pending from "../../components/Pending/Pending";
import Success from "../../components/Success/Success";
import Error from "../../components/Error/Error";
import Pay from "../../components/Pay";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const {
    data,
    isError,
    isFetching,
    error: err,
  } = useReadMyDataQuery({
    id: JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))._id,
  });

  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [paymentPopup, setPaymentPopUp] = useState(false);
  const [amount, setAmount] = useState();
  const [classType, setClassType] = useState();
  const [classTitle, setClassTitle] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  return (
    <>
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Payment
          </h1>
        </div>
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div className="mt-[2rem] p-10">
          {data &&
            data?.data &&
            data?.class &&
            data?.data?.class?.map((c, i) => {
              return (
                <div key={c._id} className="flex flex-col gap-3 mt-5">
                  <ul className="flex justify-between py-5 bg-[#f2f2f2] items-center w-full  min800:flex-col min800:text-center">
                    <li className="px-[35px] bg-[#f2f2f2] w-full">
                      <img
                        src={data?.class[i]?.image}
                        alt="image"
                        className="w-full h-auto max1200:h-36 run-bg rounded-md border"
                      />
                    </li>
                    <li className="py-[25px] px-[35px] bg-[#f2f2f2] w-full">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Class Name
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {data?.class[i]?.title}
                      </p>
                    </li>

                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Difficulty
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {data?.class[i]?.difficulty}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Status
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        {c?.status}
                      </p>
                    </li>
                    <li className="p-[25px] bg-[#f2f2f2] w-full text-center">
                      <p className="text-[14px] font-medium text-[#a0a0a0]">
                        Amount
                      </p>
                      <p className="text-[18px] text-black font-bold mt-3">
                        ${data?.class[i]?.amount}
                      </p>
                    </li>

                    {c?.status === "Payed" ? (
                      <li className="py-[25px] px-[55px] bg-[#f2f2f2] w-full text-right min800:text-center">
                        <button
                          onClick={() =>
                            navigate("/myClasses", { replace: true })
                          }
                          className="text-white  text-[15px] font-medium bg-[#555] py-[10px] px-[20px] rounded-[30px] mt-3 hover:bg-[#ff0336] ease-in duration-200 "
                        >
                          Detail View
                        </button>
                      </li>
                    ) : (
                      <li
                        onClick={() => {
                          setAmount(data?.class[i]?.amount);
                          setClassTitle(data?.class[i]?.title);
                          setClassType(c?.class);
                          setPaymentPopUp(true);
                        }}
                        className="py-[25px] px-[55px] bg-[#f2f2f2] w-full text-right min800:text-center"
                      >
                        <button className="text-white text-[15px] font-medium bg-[#555] py-[10px] px-[20px] rounded-[30px] mt-3 hover:bg-[#ff0336] ease-in duration-200 ">
                          Pay Now
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
        </div>
        {paymentPopup && (
          <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
            <div
              onClick={() => setPaymentPopUp(false)}
              className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
            ></div>
            <div
              className={`relative bg-white
               rounded-lg border min620:w-[90%] min800:w-[75%] max-h-[85vh] overflow-y-scroll md1000:w-[60%] md1200:w-[50%] max1200:w-[40%] -mt-32 flex flex-col items-center justify-center py-14 z-40 px-10 shadow-lg shadow-gray-500`}
            >
              <Pay
                classId={classType}
                userId={data?.data?._id}
                firstName={data?.data?.firstName}
                lastName={data?.data?.lastName}
                email={data?.data?.email}
                amount={amount}
                title={classTitle}
              />
              <Close
                onClick={() => setPaymentPopUp(false)}
                fontSize="large"
                className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Payment;
