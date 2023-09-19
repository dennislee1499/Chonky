import { useDispatch, useSelector } from "react-redux";
// import { signupUser } from "../../store/session";
import { storeErrors, removeErrors } from "../../store/errors";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SignupForm.css"
import { signup } from "../../store/session";


function SignupForm() {
  const dispatch = useDispatch();
  const [oldEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  // const defaultErrors = []; //////////
  // const errors = useSelector((state) => state.errors?.errors || defaultErrors); //////////
  const [errors, setErrors] = useState([]);
  // const history = useHistory();
  // const currentUser = useSelector((state) => state.user.currentUser);
  const currentUser = useSelector((state) => state.session.user);



  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (password === confirmPassword) {
  //     const email = oldEmail.toLowerCase();
  //     dispatch(signup({ full_name: fullName, email, password }))
  //       .then(() => {
  //         dispatch(removeErrors());
  //         history.push("/");
  //       })
  //       .catch(async (res) => {
  //         let data;
  //         try {
  //           data = await res.clone().json();
  //         } catch {
  //           data = await res.text();
  //         }
  //         if (data?.errors) {
  //           dispatch(storeErrors(data.errors));
  //         } else {
  //           dispatch(removeErrors());
  //         }
  //       });
  //   } else {
  //     dispatch(storeErrors({ errors: "Passwords must be matching" })); //////////
  //   }
  // }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const lowerEmail = oldEmail.toLowerCase();
      return dispatch(
        signup({ email: lowerEmail, fullName, password })
      ).catch(async (res) => {
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
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };




  return (
    <>
      <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <h3>Please enter your information</h3>
          <ul className="signup-info">
            <input
              placeholder="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                // console.log("Full name changed:", e.target.value); //////
              }}
              required
            />
            <input
              placeholder="Email Address"
              type="text"
              value={oldEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            {errors.length ? (
              <p className="signup-errors">{errors[0]}</p>
            ) : null}
            <input
              placeholder="Password (At least 6 characters)"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {errors.length ? (
              <p className="signup-errors">{errors[1]}</p>
            ) : null}

            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors ? <p className="signup-errors">{errors.errors}</p> : null}
          </ul>

          <ul className="password-tips" style={{ listStyle: "disc" }}>
            Tips for a strong password:
            <li>Create a unique password</li>
            <li>Use both uppercase and lowercase letters</li>
            <li>Incorporate special characters and numbers</li>
          </ul>

          <input
            className="signup-button"
            type="submit"
            value="Create Account"
          ></input>
          <p className="sign-in-link-from-signup">
            Already have an account?
            <Link
              onClick={() => {
                dispatch(removeErrors());
              }}
              to="/login"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignupForm;





  
