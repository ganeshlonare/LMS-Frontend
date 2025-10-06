import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking user logged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for dispaying the options, according to user role
  const role = useSelector((state) => state?.auth?.role);

  // theme state and persistence
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  // apply theme to html[data-theme]
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // function to hide the drawer on close button click
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    // collapsing the drawer-side width to zero
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };

  // function for changing the drawer width on menu button click
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  // function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();

    // calling logout action
    const res = await dispatch(logout());

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Top navigation with drawer for mobile */}
      <div className="drawer z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="navbar bg-base-100 text-base-content max-w-[1400px] mx-auto">
              <div className="flex-1">
                {/* Mobile menu button */}
                <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden" onClick={changeWidth}>
                  <FiMenu size={24} />
                </label>
                {/* Brand */}
                <Link to="/" className="btn btn-ghost normal-case text-xl">LMS</Link>
              </div>
              {/* Center menu for large screens */}
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal px-1 gap-6 text-lg">
                <li>
                  <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                </li>
                </ul>
              </div>
              {/* Right side: theme + auth actions */}
              <div className="flex-none flex items-center gap-3">
                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn btn-ghost btn-sm"
                  title={theme === "light" ? "Switch to dark" : "Switch to light"}
                >
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                {!isLoggedIn ? (
                  <div className="flex gap-2">
                    <Link
                      to="/signup"
                      className="group relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600"
                    >
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {role === "USER" && (
                      <Link to="/user/dashboard" className="group relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600 text-sm">
                      <span className="relative z-10">Dashboard</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    )}
                    {role === "ADMIN" && (
                      <Link to="/admin/dashboard" className="group relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600 text-sm">
                      <span className="relative z-10">Admin Panel</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          {/* Make the menu take full height and use flex column to push footer actions to bottom */}
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative h-screen flex flex-col overflow-y-auto">
            {/* close button for drawer */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to={"/"}>Home</Link>
            </li>


            <li>
              <Link to={"/courses"}>All Courses</Link>
            </li>

            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>

            <li>
              <Link to={"/about"}>About Us</Link>
            </li>

            {/* creating the bottom part of drawer */}
            {/* if user is not logged in */}
            {!isLoggedIn && (
              <li className="mt-auto w-full">
                <div className="w-full flex items-center justify-center gap-3">
                  <Link
                    to={"/signup"}
                    className="group relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600 w-1/2 text-center"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </li>
            )}

            {/* if user is logged in */}
            {isLoggedIn && (
              <li className="mt-auto w-full">
                <div className="w-full flex items-center justify-center gap-3">
                  {role === "USER" && (
                    <Link to={"/user/dashboard"} className="group relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600 w-full text-center">
                      <span className="relative z-10">Dashboard</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  )}
                  {role === "ADMIN" && (
                    <Link to={"/admin/dashboard"} className="group relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-slate-600 w-full text-center">
                      <span className="relative z-10">Admin</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      {/* adding the footer content */}
      <Footer />
    </div>
  );
};

export default Layout;
