import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Loading() {
  const [showlable] = useState("E.T.U Att. Manage");
  const [endIndex, setEndIndex] = useState(0);
  const [token] = useState(null);
  const navigate = useNavigate();
  document.title = 'Student Attendance Management';

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setEndIndex((last) => {
          const newIndex = last + 1;
          return newIndex;
        });
      }, 100);

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let Tkn = Cookies.get("tkn");
    if (Tkn) {
      setTimeout(() => {
        navigate('/dashboard')
      }, 4000);
    } else{
      setTimeout(() => {
        navigate('/register');
      }, 4000);
    }
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="iconwithtext">
        <FontAwesomeIcon className="logo-icon" icon={faGraduationCap} />
        <h2>{showlable.slice(0, endIndex)}</h2>
      </div>
      {token && <p>We're preparing your dashboard, please wait...</p>}
    </div>
  );
}

export default Loading;
