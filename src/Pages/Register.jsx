import React, { useEffect, useRef, useState } from "react";
import DefaultImage from "../images/user-default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Validator from "validator";
import {
  faArrowRight,
  faCheck,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Api_Url } from "../config";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserData } from "../context";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { updateUserData } = useUserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [classes, setClass] = useState("");
  const [classNames] = useState([
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
  ]);
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [image, setImage] = useState({
    url: "",
    fileName: "",
  });
  const [ShowDropDown, setShowdropdown] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading_response, setloading_response] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    class: "",
    rollNo: "",
    profile: "",
  });
  const navigate = useNavigate();

  // Lable Shown
  const [nameLabel, setNamelabel] = useState(false);
  const [emaillabel, setEmaillabel] = useState(false);
  const [passwordlabel, setPasswordlabel] = useState(false);
  const [cPasslabel, setCPasslabel] = useState(false);
  const [classlabel, setClasslabel] = useState(false);
  const [rollNolabel, setRollNolabel] = useState(false);
  // Ref
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const cPassRef = useRef(null);
  const rollNoRef = useRef(null);
  const selectRef = useRef(null);

  // Function Input On Blur
  const BlurInput = (val, ele) => {
    if (val !== "") {
      ele(true);
    } else {
      ele(false);
    }
  };

  // Check User Auth
  useEffect(() => {
    const token = Cookies.get("tkn");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);


  useEffect(() => {

    const WindowScroll = () => {
      console.log(window.scrollY);
    }

    window.addEventListener('scroll' , WindowScroll)

    return () => {
      window.removeEventListener('scroll' , WindowScroll);
    }

  } , [])

  const handleFileChange = (event) => {
    setError({ ...error, profile: "" });
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage({
          url: reader.result,
          fileName: file.name,
        });
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = () => {
    if(!loading_response){
      if (name) {
        if (name.length < 3 && name.length > 25) {
          window.scrollTo({
            top: 75,
            behavior: 'smooth' 
          });
          return setError({
            ...error,
            name: "Enter Name at least 3 - 25 Letters",
          });
        }
      } else {
        window.scrollTo({
          top: 75,
          behavior: 'smooth' 
        });
        return setError({ ...error, name: "Please Enter Your Name" });
      }
  
      if (email) {
        if (!Validator.isEmail(email)) {
          window.scrollTo({
            top: 175,
            behavior: 'smooth' 
          });
          return setError({ ...error, email: "Please Enter Valid Email" });
        }
      } else {
        window.scrollTo({
          top: 175,
          behavior: 'smooth' 
        });
        return setError({ ...error, email: "Please Enter Your Email" });
      }
  
      if (rollNo) {
        if (!Validator.isNumeric(rollNo)) {
          window.scrollTo({
            top: 260,
            behavior: 'smooth' 
          });
          return setError({ ...error, rollNo: "Please Enter Valid Roll No" });
        }
      } else {
        window.scrollTo({
          top: 260,
          behavior: 'smooth' 
        });
        return setError({ ...error, rollNo: "Please Enter Your Roll No" });
      }
  
      if (!classes) {
        window.scrollTo({
          top: 330,
          behavior:'smooth' 
        });
        return setError({ ...error, class: "Please Select You Class" });
      }
  
      if (password) {
        if (password.length < 8 && password.length > 30) {
          window.scrollTo({
            top: 400,
            behavior:'smooth' 
          });
          return setError({
            ...error,
            password: "Enter Password at least 8 - 30 Letters",
          });
        }
      } else {
        window.scrollTo({
          top: 400,
          behavior:'smooth' 
        });
        return setError({ ...error, password: "Please Enter Your Password" });
      }
  
      if (Cpassword) {
        if (Cpassword !== password) {
          window.scrollTo({
            top: 460,
            behavior:'smooth' 
          });
          return setError({ ...error, cpassword: "Passwords Do Not Match" });
        }
      } else {
        window.scrollTo({
          top: 460,
          behavior:'smooth' 
        });
        return setError({ ...error, cpassword: "Please Enter Confirm Password" });
      }
  
      if (!image.url) {
        window.scrollTo({
          top: 530,
          behavior:'smooth' 
        });
        return setError({
          ...error,
          profile: "Please Select Your Profile Picture",
        });
      }

      setloading_response(true);
  
      let data = {
        name,
        email,
        rollNo,
        classes,
        password,
        profilePicture: image.url,
      };
  
      axios.post(`${Api_Url}/register`, data).then((res) => {

        setloading_response(false);

        if (res.data.status === 409) {
          window.scrollTo({
            top: 175,
            behavior: 'smooth' 
          });
          return setError({ ...error, email: "Email Already Registered!!" });
        }
        console.log(res.data);
        Cookies.set("tkn", res.data.token, {
          expires: 9999999,
        });
        navigate("/dashboard");
      });
    }
  };

  return (
    <div className="register-container">
      <div className="form">
        <h2>Registration Form</h2>
        <div className="input-container">
          <div
            className="label"
            style={{
              transform: nameLabel ? "translateY(12px)" : "translateY(37px)",
              color: nameLabel ? "rgb(51, 50, 50)" : "rgb(80, 79, 79)",
            }}
            onClick={() => nameRef.current.focus()}
          >
            Name
          </div>
          <input
            type="text"
            id="name"
            value={name}
            ref={nameRef}
            onFocus={() => setNamelabel(true)}
            onBlur={() => BlurInput(name, setNamelabel)}
            onChange={(e) => {
              setName(e.target.value);
              setError({ ...error, name: "" });
            }}
            spellCheck={false}
            autoComplete="off"
          />
          {error.name && <div className="error-msg">{error.name}</div>}
        </div>
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
              transform: rollNolabel ? "translateY(12px)" : "translateY(37px)",
              color: rollNolabel ? "rgb(51, 50, 50)" : "rgb(80, 79, 79)",
            }}
            onClick={() => rollNoRef.current.focus()}
          >
            Roll No
          </div>
          <input
            type="text"
            id="rollno"
            value={rollNo}
            ref={rollNoRef}
            onFocus={() => setRollNolabel(true)}
            onBlur={() => BlurInput(rollNo, setRollNolabel)}
            onChange={(e) => {
              setRollNo(e.target.value);
              setError({ ...error, rollNo: "" });
            }}
            spellCheck={false}
            autoComplete="off"
          />
          {error.rollNo && <div className="error-msg">{error.rollNo}</div>}
        </div>
        <div className="input-container">
          <div
            className="label"
            style={{
              transform: classlabel ? "translateY(12px)" : "translateY(37px)",
              color: classlabel ? "rgb(51, 50, 50)" : "rgb(80, 79, 79)",
              cursor: classlabel ? "default" : "pointer",
            }}
            onClick={() => {
              setClasslabel(true);
              setShowdropdown(true);
            }}
          >
            Class
          </div>
          <div
            className="class-container"
            onClick={() => {
              setClasslabel(true);
              setShowdropdown(!ShowDropDown);
            }}
          >
            <div id="class">{classes}</div>
            <div
              className="classoptions"
              style={{
                height: ShowDropDown ? "300px" : 0,
              }}
              onClick={() => {
                setShowdropdown(false);
              }}
            >
              {classNames.map((names, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setClass("Class " + names);
                      setError({ ...error, class: "" });
                    }}
                  >
                    Class {names}
                  </li>
                );
              })}
            </div>
          </div>
          {error.class && <div className="error-msg">{error.class}</div>}
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
        <div className="input-container">
          <div
            className="label"
            style={{
              transform: cPasslabel ? "translateY(12px)" : "translateY(37px)",
              color: cPasslabel ? "rgb(51, 50, 50)" : "rgb(80, 79, 79)",
            }}
            onClick={() => cPassRef.current.focus()}
          >
            Confirm Password
          </div>
          <input
            type={showPass ? "text" : "password"}
            id="cpass"
            ref={cPassRef}
            autoComplete="off"
            value={Cpassword}
            onFocus={() => setCPasslabel(true)}
            onBlur={() => BlurInput(Cpassword, setCPasslabel)}
            onChange={(e) => {
              setCPassword(e.target.value);
              setError({ ...error, cpassword: "" });
            }}
            spellCheck={false}
          />
          {error.cpassword && (
            <div className="error-msg">{error.cpassword}</div>
          )}
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
        <div className="profilepicture">
          <div>
            <div
              className="upload-label"
              onClick={() => selectRef.current.click()}
              style={{
                backgroundColor: image.url ? "aqua" : "white",
              }}
            >
              Upload Picture{" "}
              <span>
                <FontAwesomeIcon icon={faUpload} />
              </span>
            </div>
            {image.url && (
              <>
                <div className="filename">
                  {image.fileName.length > 30
                    ? image.fileName.substring(0, 30) + "..."
                    : image.fileName}
                </div>
                <div
                  className="delete-image"
                  onClick={() => {
                    setImage({ url: "", fileName: "" });
                  }}
                >
                  Delete
                </div>
              </>
            )}
          </div>
          <img src={image.url ? image.url : DefaultImage} alt="im" />
          <input
            onChange={handleFileChange}
            ref={selectRef}
            type="file"
            id="selectpicture"
            hidden
          />
        </div>
        {error.profile && <div className="error-msg">{error.profile}</div>}

        <div className="submitBtn" style={{
          cursor : loading_response ? 'not-allowed' : 'pointer'
        }} onClick={handleSubmit}>
          Register{" "}
          <span style={{ marginLeft: 10 }}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          {loading_response && (
            <div className="spinner">
              <div className="circle"></div>
            </div>
          )}
        </div>
        <div className="loginLink">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
