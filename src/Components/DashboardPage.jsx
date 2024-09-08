import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context";
import Footer from "./Footer";

function DashboardPage({ data }) {
  const { MarkAttendence, attendanceLoading } = useUserData();
  const navigate = useNavigate();
  document.title = "S.A.M - Dashboard";

  const markAtt = () => {
    if (!data.attendenceMarked) {
      MarkAttendence();
    } else {
      navigate("/all-attendence");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="home-section">
        <div className="home-section-webname">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="icon-graduation-cap"
            style={{
              marginRight: "10px",
            }}
          />
          <h2>S.A.M</h2>
        </div>
        <h1>Welcome Back, {data ? data.name + "!" : "User Name"}</h1>
        <p>Your attendance and leave management at a glance.</p>
        <div className="buttons-homepage">
          <li className="att-check" onClick={markAtt}>
            {data ? (
              data.attendenceMarked ? (
                <div>Attendence Marked</div>
              ) : (
                <div>
                  Mark Attendence{" "}
                  {attendanceLoading && (
                    <div className="spinner">
                      <div className="circle"></div>
                    </div>
                  )}
                </div>
              )
            ) : null}
          </li>
          <li
            className="leave-report"
            onClick={() => {
              navigate("/leave-report");
            }}
          >
            Leave Report{" "}
          </li>
        </div>
      </div>
      <div className="help-section">
        <h2>Help & Support</h2>
        <p>Contact our support team for assistance.</p>
        <div className="icon-with-content">
          <div className="icon-container">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </div>
          <div className="helpcontent">
            <h2>Welcome to the Help Center!</h2>
            <p>
              If you have any questions about our service or product, or if you
              need assistance, this section is for you. Here, you will find
              answers to common questions, troubleshooting tips, and ways to get
              in touch with us. We’re here to help make your experience better.
            </p>
          </div>
        </div>
        <div className="help-section-buttons">
          <li>FAQ</li>
          <li>Contact Us</li>
        </div>
      </div>
      {/* Information Section */}
      <section className="info-section">
        <h2>Website Information</h2>

        <div className="info-paragraph">
          <h3>Attendance Timings</h3>
          <p>
            Dear users, please note that attendance is open from{" "}
            <strong>8:00 AM to 2:00 PM</strong> daily. If you fail to mark your
            attendance by 2:00 PM, your status will automatically be marked as
            absent. Please make sure to mark your attendance on time.
          </p>
        </div>

        <div className="info-paragraph">
          <h3>Leave Application Policy</h3>
          <p>
            If you need to take a leave, make sure to submit your leave
            application through the "Leave Report" section. All leave requests
            must be submitted at least one day in advance for approval.
            Emergency leaves are accepted under certain conditions. For more
            details, please refer to our leave policy page.
          </p>
        </div>

        <div className="info-paragraph">
          <h3>Profile Management</h3>
          <p>
            It is important to keep your profile information up to date. Make
            sure your contact details, email, and other essential information
            are correct to ensure seamless communication. You can update your
            profile from the "Profile" section.
          </p>
        </div>

        <div className="info-paragraph">
          <h3>Security and Privacy</h3>
          <p>
            Your security is our top priority. All data is encrypted and
            securely stored. We do not share your data with third parties
            without your consent. Please review our privacy policy for more
            information.
          </p>
        </div>

        <div className="info-paragraph">
          <h3>Support and Contact</h3>
          <p>
            If you have any issues or need assistance, you can reach out to our
            support team via the "Help" section or directly email us at
            support@example.com. Our team is available from 9:00 AM to 6:00 PM.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DashboardPage;
