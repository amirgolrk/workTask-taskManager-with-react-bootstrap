import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
//import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Features/loginSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
const Layout = () => {
  const dispatchTo = useDispatch();
  const navigateTo = useNavigate();
  const [logOutOpen, setLogOutOpen] = useState(false);
  const userEmailRedux = useSelector((state) => state.login.email);
  console.log(userEmailRedux);
  const userEmail = localStorage.getItem("email");

  const logoutHandler = () => {
    console.log("bjhvc");
    dispatchTo(
      logOut({
        onSuccess: () => {
          navigateTo("login");
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
    setLogOutOpen(false)
  };

  return (
    <>
      <div className="container-fluid">
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
                  <Link
                    title="go to signUp page"
                    className="nav-link"
                    aria-current="page"
                    to="signUp"
                  >
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
                <li className="nav-item">
                  <Link title="Sign up to App" className="nav-link" to="signUp">
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
                {!userEmail && (
                  <li className="nav-item">
                    <Link title="Log into App" className="nav-link" to="login">
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
                )}
                {userEmail && (
                  <li
                    title="logOut from the app"
                    className="nav-item nav-link  text-danger"
                    onClick={() => {
                      setLogOutOpen(true);
                    }}
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
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {logOutOpen && (
        <div className=" mx-auto  bg-warning text-center w-75 mb-4 py-2 font-weight-bold fs-3 fw-bold rounded-bottom-5">
          <div className="clearfix">
            <span className="float-start ps-3">
              <div>Are you sure ?</div>
            </span>
            <span className="float-end pe-3">
              {" "}
              <button
                type="button"
                onClick={logoutHandler}
                className="btn bg-danger fs-4 fw-bold me-5"
              >
                Log out
              </button>
              <button
                type="button"
                className="btn bg-success fs-4 fw-bold px-4"
                onClick={() => {
                  setLogOutOpen(false);
                }}
              >
                No
              </button>
            </span>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
