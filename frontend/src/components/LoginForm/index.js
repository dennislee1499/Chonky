import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const currentUser = useSelector((state) => state.session?.user);
  const currentUser = useSelector((state) => state.session.user);
  // const errors = useSelector((state) => state.errors) || []; /////
  const [errors, setErrors] = useState([])
  const history = useHistory();

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
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };





  return (
    <>
      <h1 className="login-form-title">Sign in or register</h1>
      {/* {errors.length ? <p className="invalid-login-error">{errors}</p> : null} */}
      {errors.length
        ? errors.map((error, idx) => (
            <p key={idx} className="invalid-login-error">
              {error}
            </p>
          ))
        : null}

      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="login-form-title">Sign In</h3>
          <ul className="login-info">
            <input
              placeholder="Email Address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </ul>
          <input id="signin-button" type="submit" value="Sign In" />
          <button
            onClick={() =>
              dispatch(login({ email: "demo@user.io", password: "password" }))
            }
            id="signin-button"
          >
            Demo Login
          </button>
        </form>
        <div className="login-new-customer">
          <div className="divider-container">
            <div className="divider1"></div>
            <h3>New to Chonky?</h3>
            <div className="divider2"></div>
          </div>
          <br />
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
