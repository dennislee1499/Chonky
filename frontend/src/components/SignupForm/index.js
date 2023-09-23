import { useDispatch, useSelector } from "react-redux";
import { removeErrors } from "../../store/errors";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./SignupForm.css"
import { signup } from "../../store/session";



function SignupForm() {
  const dispatch = useDispatch();
  const [oldEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [hasSignedUp, setHasSignedUp] = useState(false);



  const [fullNameErrors, setFullNameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    setFullNameErrors([]);
    setEmailErrors([]);
    setPasswordErrors([]);
    setConfirmPasswordErrors([]);

    let fullNameErrors = [];
    let emailErrors = [];
    let passwordErrors = [];
    let confirmPasswordErrors = [];

    if (!fullName.trim()) {
      fullNameErrors.push("Name cannot be empty");
    }

    if (!oldEmail.trim()) {
      emailErrors.push("Email cannot be empty");
    } else if (!/\S+@\S+\.\S+/.test(oldEmail)) {
      emailErrors.push("Invalid email address");
    }

    if (password.length < 6) {
      passwordErrors.push("Password too short");
    }

    if (password !== confirmPassword) {
      confirmPasswordErrors.push("Passwords must match");
    }

    setFullNameErrors(fullNameErrors);
    setEmailErrors(emailErrors);
    setPasswordErrors(passwordErrors);
    setConfirmPasswordErrors(confirmPasswordErrors);

    if (
      fullNameErrors.length ||
      emailErrors.length ||
      passwordErrors.length ||
      confirmPasswordErrors.length
    ) {
      return;
    }

    const lowerEmail = oldEmail.toLowerCase();

    dispatch(signup({ email: lowerEmail, full_name: fullName, password }))
      .then(() => {
        setHasSignedUp(true); 
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          data.errors.forEach((error) => {
            if (error.toLowerCase().includes("name")) {
              setFullNameErrors((prev) => [...prev, error]);
            } else if (error.toLowerCase().includes("email")) {
              setEmailErrors((prev) => [...prev, error]);
            } else if (error.toLowerCase().includes("password")) {
              setPasswordErrors((prev) => [...prev, error]);
            } else if (error.toLowerCase().includes("confirm")) {
              setConfirmPasswordErrors((prev) => [...prev, error]);
            } else {
              setFullNameErrors((prev) => [...prev, error]);
              setEmailErrors((prev) => [...prev, error]);
              setPasswordErrors((prev) => [...prev, error]);
              setConfirmPasswordErrors((prev) => [...prev, error]);
            }
          });
        } else if (data) {
          const genericError = typeof data === "string" ? [data] : data;
          setFullNameErrors(genericError);
          setEmailErrors(genericError);
          setPasswordErrors(genericError);
          setConfirmPasswordErrors(genericError);
        } else {
          const statusError = [res.statusText];
          setFullNameErrors(statusError);
          setEmailErrors(statusError);
          setPasswordErrors(statusError);
          setConfirmPasswordErrors(statusError);
        }
      });
  };

  if (hasSignedUp) {
    return <Redirect to="/splash" />;
  }


  return (
    <>
      <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <ul className="signup-info">
            <input
              className={fullNameErrors.length ? "errors" : ""}
              placeholder="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
            {fullNameErrors.length ? (
              <p className="signup-errors">{fullNameErrors[0]}</p>
            ) : null}

            <input
              className={emailErrors.length ? "errors" : ""}
              placeholder="Email Address"
              type="text"
              value={oldEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            {emailErrors.length ? (
              <p className="signup-errors">{emailErrors[0]}</p>
            ) : null}
            <input
              className={
                passwordErrors.length || confirmPasswordErrors.length
                  ? "errors"
                  : ""
              }
              placeholder="Password (At least 6 characters)"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {passwordErrors.length ? (
              <p className="signup-errors">{passwordErrors[0]}</p>
            ) : null}

            <input
              className={confirmPasswordErrors.length ? "errors" : ""}
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordErrors.length ? (
              <p className="signup-errors">{confirmPasswordErrors[0]}</p>
            ) : null}
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





  
