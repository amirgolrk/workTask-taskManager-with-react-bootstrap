import "./LoginForm.css";
import { Link,useNavigate } from "react-router-dom";
//import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import axios from "axios";
import { useDispatch } from "react-redux";
import {auth,handlingChange} from "../Features/loginSlice"
import { toast } from "react-toastify";
const LoginForm = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
    /*const pageNavigate = useNavigate()
    const [loginInfo,setLoginInfo] = useState({
        email : "",
        password : ""
    })*/
    const changeHandler = (e) => {
      const name = e.target.name
      const value = e.target.value
      dispatch(handlingChange({name , value}))
        /*setLoginInfo({
            ...loginInfo,
            [e.target.name] : e.target.value
    })*/
    }

    const submitHandler = (e) => {
        e.preventDefault()
         //dispatch(getTasks())
         dispatch(auth({onSuccess :() => {navigateTo("/todo")},onFail: () => {toast.error('you are not logged in', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });}}))
        /*axios.post("http://localhost:4000/login",{
            email:loginInfo.email,
            password:loginInfo.password
        }).then(response => {
            localStorage.setItem("token",response.data.accessToken)
            localStorage.setItem("id",response.data.user.id)
            localStorage.setItem("email",response.data.user.email)
            ;pageNavigate("/todo")
            console.log(response.data);
        }).catch((e) => {alert(e.response.data)})*/
    }


    

    



  return (
    <form className="form mx-auto" onSubmit={submitHandler}>
  <p className="form-title">Log in to your account</p>
  <div className="input-container">
    <input type="email" name="email" placeholder="Enter email" onChange={changeHandler}/>
    <span></span>
  </div>
  <div className="input-container">
    <input type="password" name="password" placeholder="Enter password"onChange={changeHandler}/>
  </div>
  <button type="submit" className="submit">
    Log in
  </button>
  <p className="signup-link">
    No account?
    <Link to={'/'}>Sign Up</Link>
  </p>
</form>
  );
};

export default LoginForm;
