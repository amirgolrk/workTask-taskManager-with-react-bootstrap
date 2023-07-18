import "./SignUpForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
//import { Link } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const [password1,setPassword1] = useState('');
  const [password2,setPassword2] = useState('');
  const [email,setEmail] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const [passIsEqual,setPassIsEqual] = useState(false)


  const handleInputChange = (event , setInput) => {
    const { name,value } = event.target
    //const value = event.target.value
    setInput(value)
    console.log(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    setPassIsEqual(password1 === password2);
    if(!passIsEqual){
      try{
        //setFormData({
        //  ...formData,
        //  [event.target.name]: event.target.value
        //});
        console.log(formData);
       const response = await axios.post("http://localhost:4000/register",formData)
       const token = response.data.accessToken
       console.log(token);
       localStorage.setItem('token',token)
       alert('signUp successful moving you to the login page')
       navigate("/login")

      }catch(error){
        console.log(error.response.data);
        alert(error.response.data)
      }
    }else{alert('password does not match')}
    setPassword1('')
    setPassword2('')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <div className="form-box">
            <form className="form" onSubmit={submitHandler}>
              <span className="title">Sign up</span>
              <hr/>
              <span className="subtitle">
                Create a free account with your email.
              </span>
              <div className="form-container">
                <input type="email" name="email" className="input" placeholder="Email" value={email} onChange={(event) => handleInputChange(event, setEmail)}/>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  value={password1}
                  onChange={(event) => handleInputChange(event, setPassword1)}
                />
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="repeat password"
                  value={password2}
                  onChange={(event) => handleInputChange(event, setPassword2)}
                />
              </div>
                <button type="submit">Sign up</button>
            </form>
            <div className="form-section">
              <p>
                Have an account? <Link to={"login"}>log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
