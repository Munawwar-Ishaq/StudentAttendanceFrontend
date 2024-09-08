import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "../context";
import axios from "axios";
import { Api_Url } from "../config";
import Cookies from "js-cookie";

function ProfilePage() {
  document.title = 'S.A.M - Profile';
  const { userdata, updateUserData } = useUserData();
  const [isEditing, setEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);
  const [val, setVal] = useState({
    name: userdata?.name || "",
    email: userdata?.email || "",
    rollNo: userdata?.rollNo || "",
    class: userdata?.classes || "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileLoading(true);
        axios
          .post(`${Api_Url}/updateAccount`, {
            token: Cookies.get("tkn"),
            profilePicture: reader.result,
          })
          .then((res) => {
            setProfileLoading(false);
            updateUserData(res.data.data);
            console.log(res.data);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const UpdateDataRequest = (data) => {
    setUpdatingData(true);
    axios
      .post(`${Api_Url}/updateAccount`, {
        ...data,
        token: Cookies.get("tkn"),
      })
      .then((res) => {
        setUpdatingData(false);
        updateUserData(res.data.data);
        console.log(userdata);
        setEditing(false);
      });
  };

  const updateProfile = () => {
    UpdateDataRequest(val);
  };

  return (
    <div className="profile-page">
      {updatingData && (
        <div className="loading-updates">
          <div className="loader"></div>
          <p>Updating Profile Data Please Wait... </p>
        </div>
      )}
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-picture">
          {profileLoading && (
            <div className="profile-loading">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <img src={userdata && userdata.profilePicture} alt="Profile" />
          <div className="upload-button">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              id="profileImageInput"
            />
            <label htmlFor="profileImageInput">
              <FontAwesomeIcon icon={faCamera} />
            </label>
          </div>
        </div>
        <div className="profile-details">
          <div className="fields">
            <div className="field-name">Name</div>
            <div className="field-input">
              {isEditing ? (
                <input
                  type="text"
                  value={val.name}
                  onChange={(e) => setVal({ ...val, name: e.target.value })}
                />
              ) : (
                <div>{userdata && userdata.name}</div>
              )}
            </div>
          </div>

          <div className="fields">
            <div className="field-name">Email</div>
            <div className="field-input">
              {isEditing ? (
                <input
                  type="text"
                  value={val.email}
                  onChange={(e) => setVal({ ...val, email: e.target.value })}
                />
              ) : (
                <div>{userdata && userdata.email}</div>
              )}
            </div>
          </div>

          <div className="fields">
            <div className="field-name">Roll No</div>
            <div className="field-input">
              {isEditing ? (
                <input
                  type="text"
                  value={val.rollNo}
                  onChange={(e) => setVal({ ...val, rollNo: e.target.value })}
                />
              ) : (
                <div>{userdata && userdata.rollNo}</div>
              )}
            </div>
          </div>

          <div className="fields">
            <div className="field-name">Class</div>
            <div className="field-input">
              {isEditing ? (
                <input
                  type="text"
                  value={val.class}
                  onChange={(e) => setVal({ ...val, class: e.target.value })}
                />
              ) : (
                <div>{userdata && userdata.classes}</div>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="edit-button" onClick={updateProfile}>
              Update Profile
            </div>
          ) : (
            <div className="edit-button" onClick={() => setEditing(true)}>
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
