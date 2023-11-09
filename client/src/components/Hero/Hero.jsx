import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import TitleBg from "../../images/pricing/titlebg.svg";
import MainButton from "../MainButton";

function Hero() {
  return (
    <>
      <section
        id="home"
        className="hero-section w-full h-screen min800:flex min800:justify-center min800:text-center"
      >
        <div className="container-hero">
          {/* hero section */}
          <div
            className="flex flex-col text-white
           absolute hero-text min800:items-center min800:-right-[22rem] min620:-right-[20rem] min800:w-[80%] min540:-right-[17rem] min450:-right-[14rem] min375:-right-[11rem]"
          >
            <p className="text-black text-[16px] uppercase font-medium relative z-10 pl-16 min800:pl-0 mb-8">
              find your energy
            </p>
            <img
              src={TitleBg}
              alt="text_bg"
              className=" w-[52%] absolute -top-3 title-white min800:w-[24rem] "
            />
            <h1 className="font-bold text-[48px] uppercase mb-[4rem] min450:text-[40px]">
              make your body <br />
              <span className="font-thin">fit & perfect</span>
            </h1>
            <MainButton
              color={`text-black`}
              bg={`bg-white`}
              text="our classes"
              goTo="/classes"
            />
          </div>
        </div>
        {/* socials */}
        <div
          className="flex flex-row-reverse -rotate-90 text-white
          absolute top-2/4 right-0 items-center min800:hidden"
        >
          <p className="uppercase  text-3xl font-bold tracking-widest">share</p>
          <span className="w-[35px] bg-[#FF0336] m-3 h-[2.5px] mr-6"></span>
          <div className="flex gap-6 md:gap-10 text-[18px] text-white min540:justify-center">
            <Facebook
              sx={{ width: 20, height: 20 }}
              fontSize="large"
              className="hover:text-[#ff0336] rotate-90 cursor-pointer"
            />
            <Instagram
              sx={{ width: 20, height: 20 }}
              fontSize="large"
              className="hover:text-[#ff0336] rotate-90 cursor-pointer"
            />
            <LinkedIn
              sx={{ width: 20, height: 20 }}
              fontSize="large"
              className="hover:text-[#ff0336] rotate-90 cursor-pointer"
            />
            <Twitter
              sx={{ width: 20, height: 20 }}
              fontSize="large"
              className="hover:text-[#ff0336] rotate-90 cursor-pointer"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
