import React, { useEffect, useState } from "react";
import { useUserData } from "../context";

function ReportPage() {
  document.title = 'S.A.M - Report';
  const [leaveType, setLeaveType] = useState("sick");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [errormsg, seterrormsg] = useState({
    date: "",
    reason: "",
  });

  const {
    sendingReport,
    leavereportRequest,
    leaveReports,
    getLeaveReports,
    error,
  } = useUserData();

  useEffect(() => {
    if (!leaveReports) {
      getLeaveReports();
    }
  }, [leaveReports , getLeaveReports]);

  useEffect(() => {
    leaveReports && leaveReports.reverse();
    setLeaveType('sick');
    setLeaveDate('');
    setLeaveReason('');
  }, [leaveReports]);

  const submitRequest = (e) => {
    e.preventDefault();

    if (leaveDate === "") {
      return seterrormsg({ ...errormsg, date: "Please Select a leave Date" });
    }

    if (leaveReason === "") {
      return seterrormsg({
        ...errormsg,
        reason: "Please Enter a leave Reason",
      });
    } else {
      if (leaveReason.length < 10) {
        return seterrormsg({
          ...errormsg,
          reason: "Leave Reason should be at least 10 characters long",
        });
      }
    }

    const leaveRequest = {
      leaveType,
      leaveDate,
      leaveReason,
    };

    leavereportRequest(
      leaveRequest.leaveDate,
      leaveRequest.leaveReason,
      leaveRequest.leaveType
    );
  };

  return (
    <div className="leave-report-page">
      <div
        className="report-err"
        style={{
          transform: error
            ? error.leaveReportMsg
              ? "translateY(10px) translateX(-50%)"
              : "translateY(-200px) translateX(-50%)"
            : "translateY(-200px) translateX(-50%)",
        }}
      >
        {error && <div className="errormsg">{error.leaveReportMsg}</div>}
      </div>
      <div className="leave-request-section">
        <h2>Submit a New Leave Request</h2>
        <form>
          <div className="form-group">
            <label htmlFor="leaveType">Leave Type:</label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              name="leaveType"
              disabled={sendingReport}
            >
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="emergency">Emergency Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leaveDate">Leave Date:</label>
            <input
              type="date"
              id="leaveDate"
              value={leaveDate}
              onChange={(e) => {
                setLeaveDate(e.target.value);
                seterrormsg({ ...errormsg, date: "" });
              }}
              name="leaveDate"
              disabled={sendingReport}
            />
            {errormsg.date && <div className="errormsg">{errormsg.date}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="leaveReason">Reason:</label>
            <textarea
              id="leaveReason"
              value={leaveReason}
              onChange={(e) => {
                setLeaveReason(e.target.value);
                seterrormsg({ ...errormsg, reason: "" });
              }}
              name="leaveReason"
              rows="4"
              disabled={sendingReport}
            />
            {errormsg.reason && (
              <div className="errormsg">{errormsg.reason}</div>
            )}
          </div>
          <button onClick={submitRequest} className="submit-button">
            Submit Request{" "}
            {sendingReport && (
              <div className="spinner">
                <div className="circle"></div>
              </div>
            )}
          </button>
        </form>
      </div>

      <div className="view-leaves-section">
        <h2>Your Leave Reports</h2>
        {leaveReports ? (
          leaveReports.length > 0 ? (
            leaveReports.map((report, index) => (
              <div key={index} className="leave-card">
                <h3>
                  {report.leaveType} Leave - {report.date}
                </h3>
                <p>Status: {report.status}</p>
                <p>Reason: {report.reason}</p>
              </div>
            ))
          ) : (
            <div>No Leave Report</div>
          )
        ) : (
          <div>Loading Reports Data Please Wait...</div>
        )}
        {/* <div className="leave-card">
          <h3>Sick Leave - 12th Aug 2024</h3>
          <p>Status: Approved</p>
          <p>Reason: Flu</p>
        </div>
        <div className="leave-card">
          <h3>Casual Leave - 25th July 2024</h3>
          <p>Status: Pending</p>
          <p>Reason: Family function</p>
        </div> */}
        {/* Add more leave cards as needed */}
      </div>
    </div>
  );
}

export default ReportPage;
