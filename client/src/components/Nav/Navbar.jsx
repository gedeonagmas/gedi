import { useContext, useEffect, useState } from "react";
import Logo from "../../images/logo/logo.svg";
import NavList from "../Nav/NavList";
import { Link } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import {
  Class,
  Dashboard,
  Logout,
  Notifications,
  Payment,
  Person2TwoTone,
  Schedule,
  Settings,
} from "@mui/icons-material";
import { navContext } from "../../App";
import {
  useReadNotificationQuery,
  useReadProfileInfoQuery,
} from "../../features/api/apiSlice";

function Navbar() {
  const {
    data: noti,
    isFetching: notiIsFetching,
    isError: notiIsError,
    error: notiErr,
  } = useReadNotificationQuery({
    type: "user",
  });

  const { data, isFetching, isError, error: err } = useReadProfileInfoQuery();
  const context = useContext(navContext);
  const [sticky, setSticky] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [settingBox, setSettingBox] = useState(false);
  const [notification, setNotification] = useState();

  useEffect(() => {
    noti &&
      setNotification(
        noti?.data?.filter((e) =>
          e.receiver.includes(
            JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))?._id
          )
        )
      );
  }, [noti]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("gymate-user-data-gedeon"));
    const jwt = localStorage.getItem("gymate-jwt-data-gedeon");
    jwt && user
      ? (context.setUserType(user.role), context.setSetting(true))
      : (context.setUserType(""), context.setSetting(false));
  }, []);

  useEffect(() => {
    data?.data &&
      localStorage.setItem(
        "gymate-user-data-gedeon",
        JSON.stringify(data?.data)
      );
  }, [data]);
  // sticky navbar - bg black
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  });

  const hamburgerMenu = () => {
    setHamburger(!hamburger);
  };

  const logoutHandler = (device) => {
    localStorage.removeItem("gymate-jwt-data-gedeon");
    localStorage.removeItem("gymate-user-data-gedeon");
    context.setSetting(false);
    device === "mobile" ? setMobile(false) : setMobile(true);
    context.setLogin(true);
  };

  const navHandler = (link, text, type, icon, device) => {
    return (
      <Link
        onClick={() => {
          setMobileNav(false);
          type === "logout" ? logoutHandler(device) : () => {};
        }}
        to={link}
        className="hover:bg-[#ff0336] hover:text-white px-1 py-1 rounded-sm w-full flex items-center justify-start gap-3 font-medium ease-in duration-200"
      >
        {icon}
        <p className="">{text}</p>
      </Link>
    );
  };

  return (
    <>
      <nav
        onClick={() => setSettingBox(false)}
        className={`flex flex-row bg-transparent items-center justify-between py-8 px-12  fixed top-0 left-0 right-0 w-full z-50 ${
          sticky ? "shadow-xl !bg-black" : ""
        }`}
      >
        <Link to="/">
          <img
            src={Logo}
            alt="logo_img"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-full h-auto"
          />
        </Link>

        {/* desktop navigation */}
        <div className="navlist-nav">
          <NavList />
        </div>

        {/* Hamburger menu */}
        <div
          onClick={() => setMobileNav(true)}
          className="text-white hidden md1200:block text-xl font-bold cursor-pointer"
        >
          <Menu sx={{ width: 44, height: 44 }} fontSize="large" />
        </div>

        {context.setting ? (
          <div className="flex gap-[-4px] md1200:hidden relative text-[16px] font-medium xl:none">
            <li className="">
              <div
                onMouseOver={() => setSettingBox(true)}
                onClick={() => {
                  window.top(0, 0);
                }}
                className="text-white cursor-pointer hover:text-[#ff0336] px-1 -mt-[23px] font-medium ease-in duration-200"
              >
                <Person2TwoTone
                  sx={{ width: 32, height: 32 }}
                  fontSize="large"
                  className="-mt-2"
                />
              </div>
            </li>
            {settingBox && (
              <div
                onMouseLeave={() => setSettingBox(false)}
                className="absolute text-gray-600 py-3 px-3 flex flex-col gap-3 mt-14 ml-2 z-20 w-64 h-auto rounded-md shadow-sm shadow-black bg-white"
              >
                {context.userType === "user" && (
                  <>
                    {navHandler(
                      "/payment",
                      "Payments",
                      "none",
                      <Payment fontSize="large" />
                    )}
                    {navHandler(
                      "/myClasses",
                      "My Classes",
                      "none",
                      <Class fontSize="large" />
                    )}
                    {navHandler(
                      "/mySchedules",
                      "My Schedules",
                      "none",
                      <Schedule fontSize="large" />
                    )}
                    {navHandler(
                      "/profile",
                      "My Profile",
                      "none",
                      <Settings fontSize="large" />
                    )}
                    {navHandler(
                      "/",
                      "Logout",
                      "logout",
                      <Logout fontSize="large" />
                    )}
                  </>
                )}

                {context.userType === "admin" && (
                  <>
                    {navHandler(
                      "/admindashboard",
                      "Dashboard",
                      "none",
                      <Dashboard fontSize="large" />
                    )}
                    {navHandler(
                      "/profile",
                      "My Profile",
                      "none",
                      <Settings fontSize="large" />
                    )}
                    {navHandler(
                      "/",
                      "Logout",
                      "logout",
                      <Logout fontSize="large" />
                    )}
                  </>
                )}

                {context.userType === "trainer" && (
                  <>
                    {navHandler(
                      "/trainerdashboard",
                      "Dashboard",
                      "none",
                      <Dashboard fontSize="large" />
                    )}
                    {navHandler(
                      "/profile",
                      "My Profile",
                      "none",
                      <Settings fontSize="large" />
                    )}
                    {navHandler(
                      "/",
                      "Logout",
                      "logout",
                      <Logout fontSize="large" />
                    )}
                  </>
                )}
              </div>
            )}
            <li className="">
              <Link
                onClick={() => {
                  window.top(0, 0);
                }}
                onMouseOver={() => setSettingBox(false)}
                className="text-white relative hover:text-[#ff0336] px-1 text-[14px] -mt-3 font-medium ease-in duration-200"
                to="/notification"
              >
                <Notifications
                  sx={{ width: 32, height: 32 }}
                  fontSize="large"
                  className="-mt-2"
                />
                {notification && (
                  <div className="absolute bg-[#ff0336] flex z-50 text-white items-center justify-center rounded-full h-10 w-10 p-1 -top-6 left-9">
                    {notification?.length}
                  </div>
                )}
              </Link>
            </li>

            <Link
              onClick={() => window.top(0, 0)}
              onMouseOver={() => setSettingBox(false)}
              className="text-black bg-white -mt-4 flex items-center justify-center gap-2 rounded-xl font-bold hover:text-white py-[2px] ml-10 px-3 hover:bg-[#ff0336] ease-in duration-200"
              to="/profile"
            >
              <img
                src={
                  data?.data?.profilePicture
                    ? data?.data?.profilePicture
                    : JSON.parse(
                        localStorage.getItem("gymate-user-data-gedeon")
                      )?.profilePicture
                }
                alt="profile"
                className="h-14 w-14 rounded-full"
              />
              {data?.data?.userName
                ? data?.data?.userName
                : JSON.parse(localStorage.getItem("gymate-user-data-gedeon"))
                    ?.userName}
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 md1200:hidden text-[16px] font-medium xl:none">
            <li className="">
              <Link
                onClick={() => window.top(0, 0)}
                className="text-black bg-white hover:bg-[#ff0336] hover:text-white py-3 px-6 font-medium ease-in duration-200"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                onClick={() => window.top(0, 0)}
                className="text-black bg-white hover:text-white py-3 px-6 font-medium hover:bg-[#ff0336] ease-in duration-200"
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </div>
        )}

        {/* mobile navigation -------------- */}
        {mobileNav && (
          <div className="flex items-center gap-10">
            <div className="flex gap-10">
              <div
                className={`flex top-0 flex-col fixed w-full left-0 h-screen bg-white z-[9999999999] py-[60px] px-[40px] ease-in-out duration-500  ${
                  hamburger ? "left-0" : "-left-[100%]"
                }`}
              >
                <i
                  onClick={hamburgerMenu}
                  className="fa-solid fa-xmark text-[#ff0336] text-[3.3rem] cursor-pointer self-end"
                ></i>

                {/* links */}
                <ul
                  className={`flex flex-col ${
                    context.setting ? "gap-2" : "gap-10"
                  } absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`}
                >
                  <li onClick={hamburgerMenu}>
                    <a
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      href="/#home"
                    >
                      Home
                    </a>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/schedule"
                    >
                      Schedule
                    </Link>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/gallery"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/pricing"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li onClick={hamburgerMenu}>
                    <Link
                      onClick={() => window.top(0, 0)}
                      className="text-[2rem] font-medium hover:text-[#ff0336] ease-in duration-200"
                      to="/classes"
                    >
                      Classes
                    </Link>
                  </li>
                  {!context.setting && (
                    <li onClick={hamburgerMenu}>
                      <Link
                        onClick={() => window.top(0, 0)}
                        className="text-[2rem] px-4 py-4 hover:text-[#ff0336] font-medium text-black ease-in duration-200"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  )}
                  {!context.setting && (
                    <li onClick={hamburgerMenu}>
                      <Link
                        onClick={() => window.top(0, 0)}
                        className="text-[2rem] px-4 py-4 hover:text-[#ff0336] font-medium text-black ease-in duration-200"
                        to="/signup"
                      >
                        Signup
                      </Link>
                    </li>
                  )}
                  {context.setting && (
                    <li className="">
                      <Link
                        onClick={() => {
                          window.top(0, 0);
                        }}
                        onMouseOver={() => setSettingBox(false)}
                        className="text-black relative hover:text-white text-[14px] mt-4 py-1 pr-2 flex gap-2 hover:bg-[#ff0336] font-medium ease-in duration-200"
                        to="/notification"
                      >
                        <Notifications
                          sx={{ width: 32, height: 32 }}
                          fontSize="large"
                          className="-mt-2 -ml-1"
                        />
                        {notification && (
                          <div className="absolute bg-[#ff0336] flex z-50 text-white items-center justify-center rounded-full h-10 w-10 p-1 -top-4 left-6">
                            {notification?.length}
                          </div>
                        )}
                        <p className="text-[18px] ml-2">Notifications</p>
                      </Link>
                    </li>
                  )}

                  {context.setting && context.userType === "user" && mobile && (
                    <div className="text-[18px] w-auto flex flex-col items-center justify-center gap-1 mt-4 font-bold">
                      <p className="text-gray-300 text-[14px]">
                        -------------------------
                      </p>
                      {navHandler(
                        "/payment",
                        "Payments",
                        "none",
                        <Payment fontSize="large" />
                      )}
                      {navHandler(
                        "/myClasses",
                        "My Classes",
                        "none",
                        <Class fontSize="large" />
                      )}
                      {navHandler(
                        "/mySchedules",
                        "My Schedules",
                        "none",
                        <Schedule fontSize="large" />
                      )}
                      {navHandler(
                        "/profile",
                        "My Profile",
                        "none",
                        <Settings fontSize="large" />
                      )}
                      {navHandler(
                        "/",
                        "Logout",
                        "logout",
                        <Logout fontSize="large" />,
                        "mobile"
                      )}
                      {navHandler(
                        "/profile",
                        data?.data?.userName
                          ? data?.data?.userName
                          : JSON.parse(
                              localStorage.getItem("gymate-user-data-gedeon")
                            )?.userName,
                        "none",
                        <img
                          src={
                            data?.data?.profilePicture
                              ? data?.data?.profilePicture
                              : JSON.parse(
                                  localStorage.getItem(
                                    "gymate-user-data-gedeon"
                                  )
                                )?.profilePicture
                          }
                          alt="profile"
                          className="h-14 w-14 -ml-1 rounded-full"
                        />
                      )}
                    </div>
                  )}
                  {context.setting &&
                    context.userType === "admin" &&
                    mobile && (
                      <div className="text-[18px] w-auto flex flex-col items-center justify-center gap-1 font-bold">
                        {navHandler(
                          "/admindashboard",
                          "Dashboard",
                          "none",
                          <Dashboard fontSize="large" />
                        )}
                        {navHandler(
                          "/profile",
                          "My Profile",
                          "none",
                          <Settings fontSize="large" />
                        )}
                        {navHandler(
                          "/",
                          "Logout",
                          "logout",
                          <Logout fontSize="large" />,
                          "mobile"
                        )}
                        {navHandler(
                          "/",
                          data?.data?.userName
                            ? data?.data?.userName
                            : JSON.parse(
                                localStorage.getItem("gymate-user-data-gedeon")
                              )?.userName,
                          "none",
                          <img
                            src={
                              data?.data?.profilePicture
                                ? data?.data?.profilePicture
                                : JSON.parse(
                                    localStorage.getItem(
                                      "gymate-user-data-gedeon"
                                    )
                                  )?.profilePicture
                            }
                            alt="profile"
                            className="h-14 w-14 -ml-1 rounded-full"
                          />
                        )}
                      </div>
                    )}

                  {context.setting &&
                    context.userType === "trainer" &&
                    mobile && (
                      <div className="text-[18px] w-auto flex flex-col items-center justify-center gap-1 font-bold">
                        {navHandler(
                          "/trainerdashboard",
                          "Dashboard",
                          "none",
                          <Dashboard fontSize="large" />
                        )}
                        {navHandler(
                          "/profile",
                          "My Profile",
                          "none",
                          <Settings fontSize="large" />
                        )}
                        {navHandler(
                          "/",
                          "Logout",
                          "logout",
                          <Logout fontSize="large" />,
                          "mobile"
                        )}
                        {navHandler(
                          "/",
                          data?.data?.userName
                            ? data?.data?.userName
                            : JSON.parse(
                                localStorage.getItem("gymate-user-data-gedeon")
                              )?.userName,
                          "none",
                          <img
                            src={
                              data?.data?.profilePicture
                                ? data?.data?.profilePicture
                                : JSON.parse(
                                    localStorage.getItem(
                                      "gymate-user-data-gedeon"
                                    )
                                  )?.profilePicture
                            }
                            alt="profile"
                            className="h-14 w-14 -ml-1 rounded-full"
                          />
                        )}
                      </div>
                    )}
                </ul>
                <button
                  onClick={() => setMobileNav(false)}
                  className="absolute top-4 text-black right-6 py-4 px-6 text-xl font-extrabold"
                >
                  <Close fontSize="large" sx={{ width: 32, height: 32 }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
