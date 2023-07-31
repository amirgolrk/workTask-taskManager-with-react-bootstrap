import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { toast } from 'react-toastify';
//import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const navigateTo = useNavigate();
  const userEmailRedux = useSelector((state) => state.login.email);
  console.log(userEmailRedux);
  const userEmail = localStorage.getItem("email");

  const logoutHandler = () => {
    localStorage.clear();
    //alert("kicking you out !!! bye bye .");
    toast.warn("kicking you out !!! bye bye .", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
      setTimeout(()=>{navigateTo("/login");},3000)

  };

  return (
    <>
      <div className="mb-4">
        {/* Navigation */}
        <nav
          className="navbar navbar-expand-lg static-top rounded-bottom-4"
          style={{ backgroundColor: "#E2EBFA" }}
        >
          <div className="container">
            {userEmail ? (
              <h3 className="navbar-brand" href="#">
                Welcome {userEmail}
              </h3>
            ) : (
              <h3>you are not logged in</h3>
            )}
            {/*<h3 className="navbar-brand" href="#">
              welcome
  </h3>*/}
            <div>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/harchi">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  {!userEmail && (
                    <Link className="nav-link" to="/login">
                      Log in
                    </Link>
                  )}
                </li>
                {userEmail && (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="logOut from the app"
                  >
                    <li
                      className="nav-item nav-link  text-danger"
                      onClick={logoutHandler}
                      style={{ cursor: "pointer" }}
                    >
                      logout{" "}
                      <RiLogoutCircleLine
                        style={{
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </li>
                  </Tooltip>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
