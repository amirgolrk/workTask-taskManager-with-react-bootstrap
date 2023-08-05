import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { toast } from "react-toastify";
//import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Features/loginSlice";
import { useDispatch } from "react-redux";
const Layout = () => {
  const dispatchTo = useDispatch();
  const navigateTo = useNavigate();
  const userEmailRedux = useSelector((state) => state.login.email);
  console.log(userEmailRedux);
  const userEmail = localStorage.getItem("email");

  const logoutHandler = () => {
    dispatchTo(
      logOut({
        onSuccess: () => {
          navigateTo("/login");
        },
        onFail: () => {
          toast.error("some error ocurred", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        },
      })
    );
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
                <Tooltip TransitionComponent={Zoom} title="go to signUp page">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                      <HiHome
                        style={{
                          color: "blue",
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Sign up to App">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <FaUserPlus
                        style={{
                          color: "mediumvioletred",
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                </Tooltip>
                {!userEmail && (
                  <Tooltip TransitionComponent={Zoom} title="Log into App">
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        <RiLoginCircleLine
                          style={{
                            color: "green",
                            fontSize: "25px",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                        />
                      </Link>
                    </li>
                  </Tooltip>
                )}
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
                      <RiLogoutCircleLine
                        style={{
                          color: "red",
                          fontSize: "25px",
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
