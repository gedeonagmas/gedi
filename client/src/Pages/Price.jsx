import Footer from "../components/Footer/Footer";
import TitleRed from "../images/who-we-are/title-bg.svg";
import BgText from "../images/pricing/bg-text.png";
import BgDumbell from "../images/pricing/bg-dumbell.png";
import MainButton from "../components/MainButton";
import { useReadFactoryQuery } from "../features/api/apiSlice";
import Pending from "../components/Pending/Pending";
import Error from "../components/Error/Error";
import { useEffect, useState } from "react";

function Price({ prices }) {
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({ type: "price", query: "" });

  const [error, setError] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [priceData, setPriceData] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    if (data) {
      setPriceData(data?.data?.filter((d, i) => i < 3));
    }
  }, [data]);

  useEffect(() => {
    if (prices) {
      setPriceData(prices);
    }
  }, [prices]);

  return (
    <>
      <section className="login-section">
        {!prices && (
          <div className="login-banner relative justify-center flex">
            <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
              Pricing
            </h1>
          </div>
        )}
        {isFetching && cancel && <Pending setCancel={setCancel} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        <section id="pricing" className="pricing-section relative">
          <div className="container page-padding py-[12rem] ">
            <img src={BgText} className="left-0 absolute" alt="bg_img" />
            {/* title div -- */}
            <div className="flex flex-col text-center relative items-center">
              <p className="text-white relative z-10 text-[15px] uppercase font-bold mb-8">
                PRICING CHART
              </p>
              <img
                src={TitleRed}
                alt="text_bg"
                className="w-[23rem] absolute -top-[10px] "
              />

              <h2 className="text-[3.4rem] font-bold mb-4">
                Exclusive Pricing Plan
              </h2>
              <p className="text-[#646464] font-medium text-[15px] ">
                Gymate has an Exclusive dynamic pricing plan for different
                clients
                <br /> select which price is feet for you.
              </p>
            </div>
            {/* pricing boxes */}
            <div className="flex gap-10 mt-32 relative z-[2] md1000:flex-col md1000:items-center ">
              {priceData ? (
                priceData?.map((d) => {
                  return (
                    <div
                      key={d._id}
                      className="flex flex-col w-1/3 md1000:w-[40rem] bg-white shadow-xl relative min540:w-[100%]"
                    >
                      <div
                        style={{ transition: "all 0.3s" }}
                        className="relative grayscale hover:grayscale-0"
                      >
                        <img
                          src={d.image}
                          alt="pricing_img"
                          className="w-full run-bg h-[300px]"
                        />
                        <div className="absolute bg-white text-[24px] font-bold w-[25rem] text-center py-6 text-[#ff0336] -bottom-[18px] left-0 right-0 mx-auto">
                          {d.title}
                        </div>
                      </div>
                      <div className="flex flex-col items-center pt-[20px] pb-[50px]">
                        {/* price */}
                        <p className="text-center text-[50px] font-bold relative py-[10px] ">
                          ${d.price}
                          <span className="text-[22px] text-[#6d6d6d] absolute font-normal bottom-[25px] -right-[6rem]">
                            p/m
                          </span>
                        </p>
                        {/* text */}
                        <div className="flex flex-col text-[16px] font-medium text-center gap-4 text-[#646464] ">
                          {d?.services[0]?.split(",").map((e, i) => {
                            return <p key={i}>{e}</p>;
                          })}
                        </div>

                        <MainButton
                          color={`!text-white`}
                          bg={`bg-[#ff0336]`}
                          text="purchase now"
                          arrowColor={`!text-white`}
                          cN="pricing-cta"
                          goTo={
                            JSON.parse(
                              localStorage.getItem("gymate-user-data-gedeon")
                            )
                              ? `/classes?${d.title}`
                              : "/login"
                          }
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-[16px] font-bold">
                  There is no pricing plan to display
                </div>
              )}
            </div>
            <img
              src={BgDumbell}
              alt="bg_icon"
              className="right-0 bottom-0 absolute z-[1]"
            />
          </div>
        </section>
        {!prices && <Footer />}
      </section>
    </>
  );
}

export default Price;
