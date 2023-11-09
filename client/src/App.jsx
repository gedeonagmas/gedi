import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Navbar from "./components/Nav/Navbar";
import { Route, Routes } from "react-router-dom";
import Classes from "./Pages/Classes";
import Price from "./Pages/Price";
import Blog from "./Pages/Blog";
import Schedule from "./Pages/Schedule";
import Gallery from "./Pages/Gallery";
import About from "./Pages/About";
import { createContext, useState } from "react";
import Profile from "./Pages/Profile";
import PageNotFound from "./Pages/PageNotFound";
import AdminDashboard from "./Pages/AdminDashboard";
import Payment from "./Pages/Users/Payment";
import MySchedule from "./Pages/Users/MySchedule";
import MyClass from "./Pages/Users/MyClass";
import Success from "./components/Success";
import Notifications from "./Pages/Notifications";
import Forget from "./Pages/Forget";
import Reset from "./Pages/Reset";
import TrainerDashboard from "./Pages/TrainerDashboard";
import RestoreDefault from "./Pages/RestoreDefault";

export const navContext = createContext();

function App() {
  const [userType, setUserType] = useState("");
  const [setting, setSetting] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [nightModeIcon, setNightModeIcon] = useState(false);
  const [notification, setNotification] = useState();
  const [login, setLogin] = useState(true);
  const jwt = localStorage.getItem("gymate-jwt-data-gedeon");
  const user = JSON.parse(localStorage.getItem("gymate-user-data-gedeon"));

  return (
    <>
      <navContext.Provider
        value={{
          userType,
          setUserType,
          setting,
          setSetting,
          login,
          setLogin,
          nightMode,
          setNightMode,
          nightModeIcon,
          setNightModeIcon,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          {login ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <Route
              path="/login"
              element={
                <PageNotFound message="Please First Logout To Your Current Account" />
              }
            />
          )}
          <Route path="signup" element={<SignUp role="user" />} />
          <Route path="classes" element={<Classes />} />
          <Route path="pricing" element={<Price />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="forget" element={<Forget />} />
          <Route path="reset" element={<Reset />} />
          {/* secure route */}
          {jwt && <Route path="/profile" element={<Profile jwt={jwt} />} />}
          {jwt && (
            <Route path="/notification" element={<Notifications jwt={jwt} />} />
          )}
          {user?.role === "admin" && (
            <Route
              path="/admindashboard"
              element={<AdminDashboard jwt={jwt} />}
            />
          )}
          {user?.role === "trainer" && (
            <Route
              path="/trainerdashboard"
              element={<TrainerDashboard jwt={jwt} />}
            />
          )}
          {/* user specific routes */}
          {user?.role === "user" && (
            <Route path="/payment" element={<Payment />} />
          )}
          {user?.role === "user" && (
            <Route path="/myClasses" element={<MyClass />} />
          )}
          {user?.role === "user" && (
            <Route path="/mySchedules" element={<MySchedule />} />
          )}
          {user?.role === "user" && (
            <Route path="/success" element={<Success />} />
          )}{" "}
          <Route path="/restore/data/to/default" element={<RestoreDefault />} />
          <Route path="*" element={<PageNotFound message="Page Not Found" />} />
        </Routes>
      </navContext.Provider>
    </>
  );
}

export default App;
