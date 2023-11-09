import React from "react";

const Payment = () => {
  return (
    <section className="login-section ">
      <div className="login-banner relative justify-center flex">
        <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
          Payment
        </h1>
      </div>
      <div className="flex w-[60%] flex-col gap-1 pt-[3px] pr-[5px] pb-[5px] pl-[5px] bg-[#f8f8f8] relative md1000:w-[60%] md1000:flex text-gray-500  md1000:flex-col md1000:mx-auto min800:w-[90%] min620:w-full">
        <ArrowBack
          fontSize="large"
          onClick={() => {
            setPayment(false);
            setPersonnelInfo(true);
          }}
          className="cursor-pointer absolute min800:-left-10 md1000:-left-44 md1200:-left-44 max1200:-left-52 top-5 hover:text-gray-500"
        />{" "}
        <h3 className="text-[28px] font-bold mb-14">Payment</h3>
        <span className="bg-[#ff0336] w-[50px] h-[4px] absolute top-[47px]"></span>
        <p className="mb-2 text-[14px] text-gray-500">
          <TouchApp fontSize="large" className="text-black rotate-90" /> don't
          worry you don't have to pay now you can pay for the next 7 days.
        </p>
        <div className="flex gap-5">
          <img
            src="./paypal.png"
            alt="paypal"
            className="w-24 h-24 rounded-sm"
          />
          <img
            src="./discover.png"
            alt="discover"
            className="w-24 h-24 rounded-sm"
          />
          <img
            src="./master.png"
            alt="paypal"
            className="w-24 h-24 rounded-sm"
          />
          <img src="./visa.png" alt="paypal" className="w-24 h-24 rounded-sm" />
        </div>
        <p className="text-[18px] mt-2">Select payment method</p>
        <div className="flex gap-10">
          <div className="flex mt-2 gap-2 text-[14px]">
            <p className="">Paypal</p>
            <input checked type="radio" name="method" id="" />
          </div>
          <div className="flex mt-2 gap-2 text-[14px]">
            <p className="">Chapa</p>
            <input type="radio" name="method" id="" />
          </div>
        </div>
        <div className="w-full flex gap-5 items-center">
          <button
            onClick={() => {}}
            type="submit"
            className="text-white bg-[#ff0336] rounded-sm w-64 py-[12px] px-[4px] font-bold min800:text-[14px] md1200:text-[16px] max1200:text-[18px] uppercase self-center mt-6"
          >
            Pay Now
          </button>

          <button
            onClick={() => {}}
            type="submit"
            className="text-gray-600 bg-white border border-gray-400 hover:text-black rounded-sm w-96 py-[12px] px-[4px] font-bold min800:text-[14px] md1200:text-[16px] max1200:text-[18px] uppercase self-center mt-6"
          >
            Pay Later And Finish
          </button>
        </div>
      </div>
    </section>
  );
};

export default Payment;
