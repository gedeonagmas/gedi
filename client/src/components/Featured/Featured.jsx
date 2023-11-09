import TitleRed from "../../images/who-we-are/title-bg.svg";
import MainButton from "../MainButton";

function Featured({ data }) {
  return (
    <>
      <section id="featured" className="page-padding py-[12.5rem] bg-white">
        <div className="container">
          {/* title */}
          <div className="flex flex-col text-center items-center relative ">
            <p className="font-semibold text-white text-[15px] relative uppercase z-10 ">
              OUR FEATURED CLASS
            </p>
            <img
              src={TitleRed}
              alt="text_bg"
              className="w-[24rem] absolute -top-[10px]"
            />
            <h2 className="text-[3.6rem] text-black font-bold my-10">
              We Are Offering Best Flexible Classes
            </h2>
          </div>
          {/* grid */}
          <div className="grid grid-cols-4 grid-rows-2 gap-7 h-full mt-7 md1000:flex md1000:flex-col">
            {data?.map((d, i) => {
              return (
                <div key={d._id} className={`item-${i}-div relative`}>
                  <div
                    className={`item-${i} relative ease-in duration-[0.4s] p-6`}
                  >
                    <img
                      src={d?.image}
                      alt="image"
                      className="absolute run-bg left-0 top-0 w-full h-full"
                    />
                  </div>
                  <div className="absolute z-10 bottom-10 left-10">
                    <p className="text-white text-[3rem] font-bold">
                      {d?.title}
                    </p>
                    <p className="text-white bg-[#FF0336] font-bold text-[16px] mt-3 py-1 px-5">
                      {i === 0
                        ? `${d?.date?.split(" ")[0]} 10:00am-11:00am`
                        : i === 1
                        ? `${d?.date?.split(" ")[0]} 9:00am-10:00am`
                        : i === 2
                        ? `${d?.date?.split(" ")[0]} 11:00am-12:00am`
                        : i === 3
                        ? `${d?.date?.split(" ")[0]} 4:00am-5:00am`
                        : i === 4
                        ? `${d?.date?.split(" ")[0]} 2:00am-3:00am`
                        : i === 5
                        ? `${d?.date?.split(" ")[0]} 2:00am-3:00am`
                        : "fri 10:00am-11:00am"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* featured cta */}
      <div className="featured-cta flex justify-center text-left items-center md1000:bg-none md1000:bg-[#ff0336] ">
        <div className="container page-padding ">
          <div className="flex items-center md1000:flex-col md1000:gap-12  md1000:text-center">
            <h2 className="text-white font-bold text-[3.7rem] md1000:text-[3rem] max-w-6xl px-7 leading-[1.2] min450:text-[2.4rem] ">
              We Are Always Providing Best Fitness Service For You
            </h2>
            <MainButton
              color={`text-black`}
              bg={`bg-white`}
              text="Join With Us"
              arrowColor={`text-black`}
              goTo="/classes"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Featured;
