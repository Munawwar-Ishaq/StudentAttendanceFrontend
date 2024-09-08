import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Validator from "validator";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_Url } from "../config";
import Cookies from "js-cookie";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading_response, setloading_response] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // Lable Shown
  const [emaillabel, setEmaillabel] = useState(false);
  const [passwordlabel, setPasswordlabel] = useState(false);
  const navigate = useNavigate();

  // Ref
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Function Input On Blur
  const BlurInput = (val, ele) => {
    if (val !== "") {
      ele(true);
    } else {
      ele(false);
    }
  };

  const handleSubmit = () => {
    if(!loading_response){
      if (email) {
        if (!Validator.isEmail(email)) {
          return setError({ ...error, email: "Please Enter Valid Email" });
        }
      } else {
        return setError({ ...error, email: "Please Enter Your Email" });
      }
  
      if (password) {
        if (password.length < 8 && password.length > 30) {
          return setError({
            ...error,
            password: "Enter Password at least 8 - 30 Letters",
          });
        }
      } else {
        return setError({ ...error, password: "Please Enter Your Password" });
      }
  
      let data = {
        email,
        password,
      };
  
      setloading_response(true);
  
      axios.post(`${Api_Url}/login`, data).then((res) => {
        console.log(res.data);
        setloading_response(false);
        if (res.data.status === 404) {
          setError({ ...error, email: "Invalid Email Address" });
        } else if (res.data.status === 401) {
          setError({ ...error, password: "Invalid Password" });
        } else if (res.data.status === 200) {
          Cookies.set("tkn", res.data.token, {
            expires: 9999999,
          });
          navigate("/dashboard");
        }
      });
    }
  };

  return (
    <div className="lgoin-container">
      <div className="form">
        <h2>Login Form</h2>
        <div className="input-container">
          <div
            className="label"
            style={{
              transform: emaillabel ? "translateY(12px)" : "translateY(37px)",
              color: emaillabel ? "rgb(51, 50, 50)" : "rgb(80, 79, 79)",
            }}
            onClick={() => emailRef.current.focus()}
          >
            Email
          </div>
          <input
            type="text"
            id="email"
            value={email}
            ref={emailRef}
            onFocus={() => setEmaillabel(true)}
            onBlur={() => BlurInput(email, setEmaillabel)}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, email: "" });
            }}
            spellCheck={false}
            autoComplete="off"
          />
          {error.email && <div className="error-msg">{error.email}</div>}
        </div>
        <div className="input-container">
          <div
            className="label"
            style={{
              transform: passwordlabel
                ? "translateY(12px)"
                : "translateY(37px)",
              color: passwordlabel ? "rgb(51, 50, 50)" : "rgb(80, 79, 79)",
            }}
            onClick={() => passwordRef.current.focus()}
          >
            Password
          </div>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            value={password}
            ref={passwordRef}
            autoComplete="off"
            onFocus={() => setPasswordlabel(true)}
            onBlur={() => BlurInput(password, setPasswordlabel)}
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ ...error, password: "", cpassword: "" });
            }}
            spellCheck={false}
          />
          {error.password && <div className="error-msg">{error.password}</div>}
        </div>
        <div className="forget-password">
          <div>Forget Password?</div>
        </div>
        <div className="showpass" onClick={() => setShowPass(!showPass)}>
          <span className="checkbox">
            {" "}
            {showPass && (
              <div className="checked">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}
          </span>{" "}
          <span>Show Password</span>
        </div>

        <div className="submitBtn" style={{
          cursor : loading_response ? 'not-allowed' : 'pointer'
        }} onClick={handleSubmit}>
          Login{" "}
          <span style={{ marginLeft: 10 }}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          {loading_response && (
            <div className="spinner">
              <div className="circle"></div>
            </div>
          )}
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
