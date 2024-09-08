import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DashboardPage from "../Components/DashboardPage";
import AllAttendencePage from "../Components/AllAttendencePage";
import ProfilePage from "../Components/ProfilePage";
import ReportPage from "../Components/ReportPage";
import { useUserData } from "../context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_Url } from "../config";
import UserImgDefault from "../images/user-default.jpg";

function Mainhomepage({ url }) {
  const [sidebarExpand, setSidebarExpand] = useState(false);
  const deviceWidth = window.innerWidth;
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { userdata, updateUserData } = useUserData();

  const navigate = useNavigate();

  let Tkn = Cookies.get("tkn");

  useEffect(() => {
    

    if (!Cookies.get("tkn")) {
      navigate("/login");
    } else {
      if (!userdata) {
        console.log("REquesting User Data");
        axios.post(`${Api_Url}/userdata/${Tkn}`).then((res) => {
          if (res.data.status === 401) {
            Cookies.remove("tkn");
            navigate("/login");
          } else if (res.data.status === 404) {
            Cookies.remove("tkn");
            navigate("/login");
          } else if (res.data.status === 200) {
            updateUserData(res.data.data);
            setUserInfoLoading(false);
          }
        });
      }
    }
  }, [navigate, Tkn, updateUserData , userdata]);

  const SideBarToggle = () => {
    setSidebarExpand(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setSidebarExpand(false);
      } else {
        setSidebarExpand(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setLogoutLoading(true);
    axios.post(`${Api_Url}/logout/${Tkn}`).then((res) => {
      if (res.data.status === 404) {
        setLogoutLoading(false);
      } else {
        Cookies.remove("tkn");
        navigate("/login");
      }
      console.log(res.data);
    });
  };

  return (
    <div className="mainhomepage">
      {userInfoLoading && (
        <div className="loading-main-page">
          <div className="loader"></div>
          <p>Getting User Data Please wait... </p>
        </div>
      )}
      {logoutLoading && (
        <div className="logout-Loading">
          <div className="loader"></div>
          <p>Logging Out Please wait... </p>
        </div>
      )}
      <div className="sidebar-container">
        <Sidebar
          activeTab={url}
          sidebarExpand={sidebarExpand}
          onToggle={SideBarToggle}
          data={userdata}
          onLogout={handleLogout}
        />
      </div>
      <div className="main-component-home">
        <div className="header-home">
          <div
            className="bar"
            style={{
              marginLeft: deviceWidth <= 800 && sidebarExpand ? "300px" : "0px",
            }}
            onClick={() => setSidebarExpand(!sidebarExpand)}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className="web-name">
            {sidebarExpand
              ? deviceWidth > 800
                ? "Student Attendence Management"
                : "S.A.M"
              : deviceWidth > 800
              ? "Student Attendence Management"
              : "S.A.M"}{" "}
          </div>
          <div className="profileimg">
            <img
              src={userdata ? userdata.profilePicture : UserImgDefault}
              alt="im"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="page-content-container">
          {url === "dashboard" && <DashboardPage data={userdata} />}
          {url === "all-attendence" && <AllAttendencePage />}
          {url === "profile" && <ProfilePage />}
          {url === "leave-report" && <ReportPage />}
        </div>
      </div>
    </div>
  );
}

export default Mainhomepage;
