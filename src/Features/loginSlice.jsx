import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    handlingChange: (state, action) => {
      state[action.payload.name] = action.payload.value;
      console.log(state);
    },
    auth: (state, action) => {
      axios
        .post("http://localhost:4000/login", {
          email: state.email,
          password: state.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("email", response.data.user.email);
          action.payload.onSuccess();
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error?.response?.data, {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.error(error?.message, {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          console.log(error);
          //action.payload.onFail()
        });
    },
    logOut: (state, action) => {
      try {
        localStorage.clear();
        toast.warn("kicking you out !!! bye bye .", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          action.payload.onSuccess();
        }, 2500);
      } catch (error) {
        action.payload.onFail();
      }
    },
  },
});

export const { auth, handlingChange, logOut } = loginSlice.actions;

export default loginSlice.reducer;
