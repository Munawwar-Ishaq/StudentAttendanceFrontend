import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "../context";

function AllAttendancePage() {
  document.title = 'S.A.M - Attendance';
  const [filter, setFilter] = useState("all");
  const { allAttendances, getAllAttendance } = useUserData();

  const filterAttendance = () => {
    if (allAttendances) {
      const today = new Date();
      let filteredData = allAttendances;
      if (filter === "lastWeek") {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filteredData = allAttendances.filter(
          (record) => new Date(record.date) >= lastWeek
        );
      } else if (filter === "lastMonth") {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        filteredData = allAttendances.filter(
          (record) => new Date(record.date) >= lastMonth
        );
      }
      return filteredData.slice().reverse();
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!allAttendances) {
      console.log("No attachments");
      getAllAttendance();
    }
  }, [allAttendances , getAllAttendance]);

  return (
    <div className="attendance-page">
      <div className="header-section">
        <FontAwesomeIcon
          icon={faCalendarCheck}
          style={{ fontSize: "50px", marginRight: "10px" }}
        />
        <h1>My Attendance Records</h1>
        <p>Track your attendance history below.</p>
      </div>

      <div className="filter-refresh">
        <div className="filter-section">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
        <div className="refresh" onClick={getAllAttendance}>
          Refresh <FontAwesomeIcon style={{
            marginLeft : 10
          }} icon={faRefresh} />
        </div>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allAttendances !== null ? (
              filterAttendance().length > 0 ? (
                filterAttendance().map((record, index) => (
                  <tr key={index}>
                    <td>{new Date(record.date).toISOString().split("T")[0]}</td>
                    <td className={record.mark ? "present" : "absent"}>
                      {record.mark ? "Present" : "Absent"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-data">
                  <td
                    colSpan={2}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      No Data Available
                    </p>
                  </td>
                </tr>
              )
            ) : (
              <tr className="loading-attendence-data">
                <td
                  colSpan={2}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <h2>Loading Attendance Data...</h2>
                  <p>Please wait a moment.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAttendancePage;
