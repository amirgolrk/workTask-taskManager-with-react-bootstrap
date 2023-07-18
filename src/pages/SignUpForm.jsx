import "./SignUpForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const SignUpForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <div className="form-box">
            <form className="form">
              <span className="title">Sign up</span>
              <hr/>
              <span className="subtitle">
                Create a free account with your email.
              </span>
              <div className="form-container">
                <input type="text" className="input" placeholder="Full Name" />
                <input type="email" className="input" placeholder="Email" />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
              </div>
              <Link to="todo">
                <button>Sign up</button>
              </Link>
            </form>
            <div className="form-section">
              <p>
                Have an account? <a href="#">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
