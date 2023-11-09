import { useEffect, useState } from "react";
import About from "../components/About/About";
import BmiCalc from "../components/BMI/BmiCalc";
import Blog from "../components/Blog/Blog";
import ChooseUs from "../components/ChooseUs/ChooseUs";
import CtaBanner from "../components/CtaBanner/CtaBanner";
import Featured from "../components/Featured/Featured";
import Footer from "../components/Footer/Footer";
import Gallery from "../components/Gallery/Gallery";
import Hero from "../components/Hero/Hero";
import Price from "../Pages/Price";
import Testimonials from "../components/Testimonials/Testimonials";
import Trainers from "../components/Trainers/Trainers";
import { useReadFactoryQuery } from "../features/api/apiSlice";
import Error from "../components/Error/Error";
import LoadingHome from "../components/LoadingHome";

function Home() {
  window.scrollTo({ top: 0 });

  const [query, setQuery] = useState(`page=1&limit=9&visible=true`);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  let fetching, err;

  const func = (type) => {
    const {
      data,
      isFetching,
      isError,
      error: errors,
    } = useReadFactoryQuery({
      type,
      query,
    });

    if (isFetching) {
      fetching = isFetching;
    }
    if (isError) {
      err = errors;
    }
    if (data) return data;
  };

  const classData = func("class")?.data?.filter((d, i) => i <= 5);
  const price = func("price")?.data?.filter((d, i) => i < 3);
  const blog = func("blog")?.data?.filter((d, i) => i < 3);
  const gallery = func("gallery")?.data?.filter((d, i) => i <= 4);

  useEffect(() => {
    err
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [err]);

  return (
    <>
      {fetching && <LoadingHome />}
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {classData && blog && price && gallery && (
        <>
          <Hero />
          <About />
          <Featured data={classData} />
          <ChooseUs />
          <Trainers />
          <Testimonials />
          <Gallery data={gallery} />
          <BmiCalc />
          <Price prices={price} />
          <Blog data={blog} />
          <CtaBanner />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
