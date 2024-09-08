import React from "react";
import UserImgDefault from "../images/user-default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faHome,
  faIdBadge,
  faFileAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarExpand, onToggle , activeTab , data, onLogout}) {
  const deviceWidth = window.innerWidth;
  const navigate = useNavigate();
  return (
    <div
      className="sidebar"
      style={{
        width: sidebarExpand ? "300px" : deviceWidth < 800 ? "0px" : "70px",
      }}
    >
      <div
        className="profileview"
        style={{
          justifyContent: sidebarExpand ? "center" : "space-around",
        }}
      >
        <img
          src={data ? data.profilePicture : UserImgDefault}
          alt="im"
          style={{
            width: sidebarExpand ? "100px" : "60px",
            height: sidebarExpand ? "100px" : "60px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        {sidebarExpand && <h2>{data ? data.name : 'User Name'}</h2>}
        <div className="underline"></div>
      </div>
      <div className="tabs">
        <li
          title="Dashboard"
          className={activeTab === 'dashboard' ? "tabactive" : ""}
          onClick={() => {
            navigate('/dashboard')
            if(deviceWidth <= 800){
              onToggle();
            }
          }}
        >
          {" "}
          <span
            style={{
              textAlign: sidebarExpand ? "left" : "center",
            }}
          >
            <FontAwesomeIcon icon={faHome} />
          </span>{" "}
          {sidebarExpand && <span>Dashboard</span>}
        </li>
        <li
          title="All Attendence"
          className={activeTab === 'all-attendence' ? "tabactive" : ""}
          onClick={() => {
            navigate('/all-attendence');
            if(deviceWidth <= 800){
              onToggle();
            }
          }}
        >
          {" "}
          <span
            style={{
              textAlign: sidebarExpand ? "left" : "center",
            }}
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
          </span>
          {sidebarExpand && <span>All Attendence</span>}
        </li>
        <li
          title="Profile"
          className={activeTab === 'profile' ? "tabactive" : ""}
          onClick={() => {
            navigate('/profile')
            if(deviceWidth <= 800){
              onToggle();
            }
          }}
        >
          {" "}
          <span
            style={{
              textAlign: sidebarExpand ? "left" : "center",
            }}
          >
            <FontAwesomeIcon icon={faIdBadge} />
          </span>{" "}
          {sidebarExpand && <span>Profile</span>}
        </li>
        <li
          title="Report"
          className={activeTab === 'leave-report' ? "tabactive" : ""}
          onClick={() => {
            navigate('/leave-report')
            if(deviceWidth <= 800){
              onToggle();
            }
          }}
        >
          {" "}
          <span
            style={{
              textAlign: sidebarExpand ? "left" : "center",
            }}
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </span>{" "}
          {sidebarExpand && <span>Leave Report</span>}
        </li>
        <li
          title="Logout"
          className={activeTab === 5 ? "tabactive" : ""}
          onClick={() => {
            if(deviceWidth <= 800){
              onToggle();
            }
            // Log out logic here
            onLogout();
          }}
        >
          {" "}
          <span
            style={{
              textAlign: sidebarExpand ? "left" : "center",
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>{" "}
          {sidebarExpand && <span>Logout</span>}
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
