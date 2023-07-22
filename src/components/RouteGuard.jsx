/* eslint-disable react/prop-types */
//import React from 'react';
import {Route } from "react-router-dom";
//importing Navigate instead of Redirect because of react-dom unsupported
//import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const RouteGuard = ({ children }) => {
  function hasJWT() {
    return !!localStorage.getItem("token");
  }
  const navigate = useNavigate();
  return (
    <Route
      render={() =>
        hasJWT() ? (
          children
        ) : (
            navigate('/login')
        )
      }
    />
  );
};

export default RouteGuard;
