import TitleRed from "../../images/who-we-are/title-bg.svg";
import { format } from "timeago.js";
import MainButton from "../MainButton";

function Blog({ data }) {
  return (
    <>
      <section id="blog" className="bg-white ">
        <div className="container page-padding py-[10rem]">
          {/* title div -- */}
          <div className="flex flex-col text-center relative items-center">
            <p className="text-white relative z-10 text-[15px] uppercase font-bold mb-8">
              latest blog
            </p>
            <img
              src={TitleRed}
              alt="text_bg"
              className="w-[23rem] absolute -top-[10px]"
            />

            <h2 className="text-[3.4rem] font-bold mb-4">Our Recent News</h2>
            <p className="text-[#646464] font-medium text-[15px] ">
              We are posting new information's for our clients
              <br /> which is available for you.
            </p>
          </div>

          {/* blog boxes */}
          <div className="flex gap-6 w-full mt-[5rem] md1200:justify-center  flex-wrap">
            {data?.map((d) => {
              return (
                <div
                  key={d._id}
                  className="w-[37rem] relative min540:w-[100%] shadow-xl flex flex-col px-[3rem] py-[2rem]"
                >
                  {/* date */}
                  <img
                    src={d?.image}
                    alt="blog"
                    className="h-32 absolute top-2 right-10 w-32 rounded-full border border-gray-400 run-bg"
                  />
                  <p className="text-[15px] self-start font-bold text-[#323232] border-[#323232] border-solid rounded-full border-[1px] w-fit px-5 py-2 mb-6">
                    {format(d?.createdAt)}
                  </p>

                  {/* title */}
                  <h3 className="text-[22px] font-bold py-5">{d?.title}</h3>
                  {/* desc */}
                  <p className="text-[15px] w-auto text-[#646464] font-medium">
                    {d?.description?.split(" ").splice(0, 17).join(" ") +
                      " " +
                      "..."}
                  </p>
                  {/* blog cta */}
                  <MainButton
                    color={`!text-white`}
                    bg={`bg-[#ff0336]`}
                    text="read more"
                    arrowColor={`!text-white`}
                    cN="pricing-cta"
                    goTo="/blog"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
