import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginSlice = createSlice({
    name : "login",
    initialState : {
        email : "",
        password : ""
    },
    reducers : {
        handlingChange :(state , action) =>  {
            state[action.payload.name] = action.payload.value
            console.log(state);
        },
        auth :(state) => {
            axios.post("http://localhost:4000/login",{
                email:state.email,
                password:state.password
            }).then(response => {
                localStorage.setItem("token",response.data.accessToken)
                localStorage.setItem("id",response.data.user.id)
                localStorage.setItem("email",response.data.user.email)
                
            }).catch(error => {alert(error?.response.data)})
        },
    }
})

export const {auth , handlingChange} = loginSlice.actions

export default loginSlice.reducer