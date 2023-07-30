import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router";

const loginSlice = createSlice({
    name : "login",
    initialState : {
        email : "",
        password : "",
    },
    reducers : {
        handlingChange :(state , action) =>  {
            state[action.payload.name] = action.payload.value
            console.log(state);
        },
        auth :(state , action) => {
            axios.post("http://localhost:4000/login",{
                email:state.email,
                password:state.password
            }).then(response => {
                localStorage.setItem("token",response.data.accessToken)
                localStorage.setItem("id",response.data.user.id)
                localStorage.setItem("email",response.data.user.email)
                action.payload.onSuccess()
            }).catch((error) => {alert(error?.response?.message)
                action.payload.onFail()
            })
        },
    }
})

export const {auth , handlingChange} = loginSlice.actions

export default loginSlice.reducer