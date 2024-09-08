import axios from "axios";
import React, { useState, createContext, useContext } from "react";
import { Api_Url } from "../config";
import Cookies from "js-cookie";
const UserContext = createContext();

const UserDataContextProvider = (props) => {
  const [userdata, setUserData] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [allAttendances, setAllAttendances] = useState(null);
  const [leaveReports, setLeaveReports] = useState(null);
  const [sendingReport, setSendingreport] = useState(false);
  const [error, setError] = useState({
    leaveReportMsg: "",
  });

  const leavereportRequest = (date, reason, leaveType) => {
    setSendingreport(true);
    axios
      .post(`${Api_Url}/leaveReport`, {
        token: Cookies.get("tkn"),
        date,
        reason,
        leaveType,
      })
      .then((res) => {
        setSendingreport(false);

        if (res.data.status === 409) {
          setError({ leaveReportMsg: res.data.message });
          setTimeout(() => {
            setError({ leaveReportMsg: "" });
          }, 2000);
        } else {
          setLeaveReports(res.data.data);
        }
      });
  };

  const MarkAttendence = () => {
    setAttendanceLoading(true);
    axios
      .post(`${Api_Url}/markAttendance`, {
        token: Cookies.get("tkn"),
        mark: true,
      })
      .then((res) => {
        setAttendanceLoading(false);
        console.log(res.data);
        if(res.data.status === 200){
          setUserData(res.data.data);
        }
      });
  };

  const getLeaveReports = () => {
    setLeaveReports(null);
    axios
      .post(`${Api_Url}/getleaveReport`, { token: Cookies.get("tkn") })
      .then((res) => {
        setLeaveReports(res.data.data);
        console.log("Get All Reports ", res.data);
      });
  };

  const getAllAttendance = () => {
    setAllAttendances(null);
    axios
      .post(`${Api_Url}/all-attendance`, { token: Cookies.get("tkn") })
      .then((res) => {
        setAllAttendances(res.data.data);
      });
  };

  const updateUserData = (data) => {
    setUserData(data);
  };

  

  return (
    <UserContext.Provider
      value={{
        userdata,
        updateUserData,
        MarkAttendence,
        attendanceLoading,
        getAllAttendance,
        allAttendances,
        leavereportRequest,
        sendingReport,
        leaveReports,
        getLeaveReports,
        error,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

const useUserData = () => useContext(UserContext);

export { UserDataContextProvider, useUserData };
