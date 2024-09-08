import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            Our Student Attendance Management System is designed to streamline
            the process of tracking attendance and managing student records
            efficiently.
          </p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <span onClick={() => {
                window.open('https://web.facebook.com/profile.php?id=61565073819099' , '_blank');
            }} className="social-icon">
              <FaFacebook />
            </span>
            <span onClick={() => {
                window.open('https://x.com/MunawwarIshaq' , '_blank' )
            }} className="social-icon">
              <FaTwitter />
            </span>
            <span onClick={() => {
                window.open('https://www.instagram.com/muhammadmunawwar124/' , '_blank' )
            }} className="social-icon">
              <FaInstagram />
            </span>
            <span onClick={() => {
                window.open('https://www.linkedin.com/in/muhammad-munawwar-167a182b9/' , '_blank' )
            }} className="social-icon">
              <FaLinkedin />
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2024 Student Attendance Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
