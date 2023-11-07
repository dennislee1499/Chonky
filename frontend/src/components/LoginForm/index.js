import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import "../Footer/Footer.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([])

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const lowerEmail = email.toLowerCase();
    return dispatch(login({ email: lowerEmail, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); 
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <>
      <div className="login-page" id="content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="login-form-subtitle">Sign In</h3>
          {errors.length ? (
            <p className="signin-errors-login">{errors}</p>
          ) : null}

          <ul className="login-info">
            <input
              className={errors.length ? "error" : ""}
              placeholder="Email Address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={errors.length ? "error" : ""}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </ul>

          <input id="signin-button" type="submit" value="Sign In" />

          <button
            type="button" 
            onClick={(e) => {
              e.preventDefault(); 
              dispatch(login({ email: "demo@user.io", password: "password" }));
            }}
            id="demo-button"
          >
            Demo Login
          </button>

          <div className="login-new-customer">
            <div className="divider-container">
              <div className="divider1"></div>
              <h3>New to Chonky?</h3>
              <div className="divider2"></div>
            </div>
            <br />
            <Link to="/register">Create Account</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
