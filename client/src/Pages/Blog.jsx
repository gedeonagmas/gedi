import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { useReadFactoryQuery } from "../features/api/apiSlice";
import Pending from "../components/Pending/Pending";
import Pagination from "../components/Pagination/Pagination";
import Error from "../components/Error/Error";

function Blog() {
  const [query, setQuery] = useState(`page=1&limit=9&visible=true`);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadFactoryQuery({
    type: "blog",
    query,
  });

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [searchedData, setSearchedData] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (counter > 3) setCounter(3);
    if (counter < 1) setCounter(1);
    setQuery(`page=${counter}&limit=9&visible=true`);
  }, [counter]);

  const searchHelper = (val) => {
    return val.toString().toLowerCase().includes(searchValue.toLowerCase());
  };

  useEffect(() => {
    if (searchValue?.length > 0) {
      setSearchedData(
        data?.data?.filter((e) => {
          const title = searchHelper(e.title);
          const category = searchHelper(e.category);
          const date = searchHelper(e.date);
          const description = searchHelper(e.description);

          if (title) {
            return title;
          } else if (category) {
            return category;
          } else if (date) {
            return data;
          } else if (description) {
            return description;
          }
        })
      );
    } else {
      setSearchedData(data?.data);
    }
  }, [searchValue, data]);

  const [description, setDescription] = useState("");
  const showMoreHandler = (id, desc) => {
    const ids = document.getElementById(id);
    if (id.split("#")[1] === "more") {
      setDescription(desc);
      const ii = document.getElementById(id.split("#")[0] + "#less");
      ii?.classList?.remove("hidden");
      ids?.classList?.add("hidden");
    } else if (id.split("#")[1] === "less") {
      setDescription(
        description.split(" ").length > 25
          ? description.split(" ").splice(0, 26).join(" ") + " ..."
          : description
      );
      const ii = document.getElementById(id.split("#")[0] + "#more");
      ii?.classList?.remove("hidden");
      ids?.classList?.add("hidden");
    }
  };

  return (
    <>
      <section>
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute flex items-center justify-center bottom-[25px] text-[3rem] font-bold">
            Blogs ({searchedData?.length}){" "}
            <p className="ml-5 text-[16px] mt-1 flex items-center justify-center">
              {"|"}{" "}
              <span className="ml-2 mt-1">
                {searchValue?.length === 0 ? "all" : searchValue}
              </span>
            </p>
          </h1>
        </div>
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}
        {isFetching && cancel && <Pending setPending={setCancel} />}
        <div className="py-[10rem] relative container gap-16 page-padding grid grid-cols-[64fr_35fr] md1000:grid-cols-1 md1000:gap-32">
          {/* blog */}
          <div className="flex flex-col gap-28">
            {searchedData?.length > 0 ? (
              searchedData?.map((e) => {
                return (
                  <div key={e._id}>
                    <img
                      src={e.image}
                      alt="blog_img"
                      className="w-full h-[400px] run-bg"
                    />
                    <p className="font-medium text-[14px] text-[#646464] pt-8 pb-4">
                      <i className="fa-solid fa-layer-group text-[#ff0336] text-[16px]"></i>
                      &nbsp; By <b>{e.owner}</b> |{" "}
                      {e.date.split(" ").splice(1, 3).join(" ")} | {e.category}
                    </p>
                    <h2 className="text-[3rem] font-bold mb-6">{e.title}</h2>
                    <p className="font-medium text-[16px] text-[#646464] mb-10">
                      {description.length > 0
                        ? description
                        : e.description.split(" ").splice(0, 26).join(" ") +
                          " ..."}
                    </p>
                    {e.description?.split(" ").length > 25 && (
                      <button
                        id={e._id + "#more"}
                        onClick={() =>
                          showMoreHandler(e._id + "#more", e.description)
                        }
                        className="px-10 text-[16px] font-bold py-5 text-white bg-[#ff0336] rounded-sm"
                      >
                        Show More
                      </button>
                    )}
                    <button
                      id={e._id + "#less"}
                      onClick={() =>
                        showMoreHandler(e._id + "#less", e.description)
                      }
                      className="px-10 hidden text-[16px] font-bold py-5 text-black bg-gray-300 rounded-sm"
                    >
                      Show Less
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-[16px] font-bold">
                There is no blog to display
              </div>
            )}
            <Pagination counter={counter} setCounter={setCounter} />
          </div>

          {/* sidebar */}
          <div>
            {/* form */}
            <div className="flex">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                className="border-solid border-[1px] text-[#444] text-[16px] font-medium h-[60px] py-[5px] px-[20px] w-full rounded-tl-xl rounded-bl-xl outline-none"
                type="search"
                placeholder="Search by Title, Category, Date, Content..."
              ></input>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass bg-[#ff0336] text-white text-[23px] h-[60px] w-[60px] rounded-br-xl rounded-tr-xl pt-[18px]"></i>
              </button>
            </div>

            {/* categories */}
            <div className="flex flex-col bg-[#f8f8f8] my-[35px] p-[30px]">
              <p className="text-[18px] text-black font-bold mb-5">
                Categories
              </p>
              <span className="w-[40px] h-[3.5px] bg-[#ff0336]"></span>
              <ul className="text-[16px] text-[#7e7e7e] font-medium mt-10">
                <li
                  onClick={(e) => {
                    setSearchValue("");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px]  fa-solid fa-chevron-right"></i>
                    &nbsp; All
                  </p>
                  <span>({data?.data?.length})</span>
                </li>
                <li
                  onClick={(e) => {
                    setSearchValue("Body Building");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px]  fa-solid fa-chevron-right"></i>
                    &nbsp; Body Building
                  </p>
                  <span>
                    (
                    {
                      data?.data?.filter((e) => e.category === "Body Building")
                        ?.length
                    }
                    )
                  </span>
                </li>

                <li
                  onClick={(e) => {
                    setSearchValue("Boxing");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px]  fa-solid fa-chevron-right"></i>
                    &nbsp; Boxing
                  </p>
                  <span>
                    (
                    {data?.data?.filter((e) => e.category === "Boxing")?.length}
                    )
                  </span>
                </li>

                <li
                  onClick={(e) => {
                    setSearchValue("Crossfit");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px]  fa-solid fa-chevron-right"></i>
                    &nbsp; Crossfit
                  </p>
                  <span>
                    (
                    {
                      data?.data?.filter((e) => e.category === "Crossfit")
                        ?.length
                    }
                    )
                  </span>
                </li>

                <li
                  onClick={(e) => {
                    setSearchValue("Fitness");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px]  fa-solid fa-chevron-right"></i>
                    &nbsp; Fitness
                  </p>
                  <span>
                    (
                    {
                      data?.data?.filter((e) => e.category === "Fitness")
                        ?.length
                    }
                    )
                  </span>
                </li>

                <li
                  onClick={(e) => {
                    setSearchValue("Meditation");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px] fa-solid fa-chevron-right"></i>
                    &nbsp; Meditation
                  </p>
                  <span>
                    (
                    {
                      data?.data?.filter((e) => e.category === "Meditation")
                        ?.length
                    }
                    )
                  </span>
                </li>

                <li
                  onClick={(e) => {
                    setSearchValue("Yoga");
                    goTop();
                  }}
                  className="cursor-pointer flex justify-between border-b border-[#dcd9d9] pb-6 mb-10 hover:text-[#ff0336] ease-in duration-200"
                >
                  <p>
                    <i className="text-[13px]  fa-solid fa-chevron-right"></i>
                    &nbsp; Yoga
                  </p>
                  <span>
                    ({data?.data?.filter((e) => e.category === "Yoga")?.length})
                  </span>
                </li>
              </ul>
            </div>

            {/* recent posts */}
            <div className="flex flex-col bg-[#f8f8f8] my-[35px] p-[30px]">
              <p className="text-[18px] text-black font-bold mb-5">
                Recent Posts
              </p>
              <span className="w-[40px] h-[3.5px] bg-[#ff0336] mb-7"></span>
              <div className="flex flex-col gap-7">
                {data &&
                  data?.data?.map((e) => {
                    return (
                      <div
                        onClick={() => {
                          setSearchValue(e.title);
                          goTop();
                        }}
                        key={e._id}
                        className="flex hover:bg-gray-200 text-black  hover:text-[#ff0336] cursor-pointer gap-8"
                      >
                        <img
                          src={e.image}
                          alt="recent_img"
                          className="w-[10rem] h-32 bg-red"
                        />
                        <div className="flex  flex-col gap-4 justify-center">
                          <p className="text-[14px] text-[#646464] font-medium">
                            {e?.date?.split(" ").splice(1, 3).join(" ")}
                          </p>
                          <p className="text-[16px] ease-in duration-200 font-bold">
                            {e.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* popular tags */}
            <div className="flex flex-col bg-[#f8f8f8] my-[35px] p-[30px]">
              <p className="text-[18px] text-black font-bold mb-5">
                Popular Tags
              </p>
              <span className="w-[40px] h-[3.5px] bg-[#ff0336] mb-7"></span>
              <div className="flex gap-3 text-[16px] text-[#646464] font-medium flex-wrap">
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Crossfit
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Fitness
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Gym
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Meditation
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Running
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Workout
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Yoga
                </p>
                <p
                  onClick={() => {
                    goTop();
                  }}
                  className="bg-white py-[4px] px-[14px] hover:text-[#ff0336] ease-in duration-200 cursor-pointer"
                >
                  #Boxing
                </p>
              </div>
            </div>
            {/* banner */}
            <div className="blog-banner w-full h-[56rem] relative">
              <p className="absolute text-[34px] font-bold uppercase top-16 left-10 z-[2]">
                gymat
              </p>
              <span className="banner-shape top-14 left-0 z-[1] bg-white absolute w-[18rem] h-[60px]"></span>
              <div className="text-white flex flex-col absolute top-[10rem] left-10">
                <p className="text-[64px] font-bold">34%</p>
                <p className="text-[20px] font-bold -mt-[10px]">
                  Flat Discount
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Blog;
