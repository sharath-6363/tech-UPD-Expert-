import React, { useState, useEffect, useContext } from "react";
import "../AllCss/Vprofile.css";
import axios from "axios";
import { Visitorcontext } from "../Visitorcontext.js";

export default function Vprofile() {
  const { viconst } = useContext(Visitorcontext);
  const [Showreplay, setShowreplay] = useState(false);
  const [Updates, setUpdates] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");

  const handelemedia = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewProfileImage(reader.result);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getudata");
      const filteredUpdates = response.data.filter(
        (item) => item.uemail === viconst.uemail
      );
      setUpdates(filteredUpdates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewReplay = () => {
    setShowreplay(!Showreplay);
  };

  const handleChangePassword = async () => {
    if(newPassword===''){
      alert("Password required")
    }else{
    try {
      const userId = Updates[0].id;
      const responses = await axios.put(
        `http://localhost:8080/putUdata/${userId}`,
        {
          ...Updates[0],
          upassword: newPassword,
        }
      );
      if (responses.status===200) {
        alert("Password updated successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Profile", error);
    }
  };
  }
  const handleChangeProfileImage = async () => {
    if (newProfileImage === "") {
      alert("Please select an image to upload");
    } else {
      try {
        const userId = Updates[0].id;
        const response = await axios.put(
          `http://localhost:8080/putUdata/${userId}`,
          {
            ...Updates[0],
            image: newProfileImage,
          }
        );
        if (response.status===200) {
          alert("Profile image updated successfully");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <div className="card w-25 mx-auto mt-3 p-3 shadow">
      <h2 className="text-center">Profile</h2>

      <div className="card-body ">
        {Updates.map((item, index) => (
          <div key={index} className="">
            <center>
            <img
              src={item.image}
              alt="profile"
              className="profileimg "
              id="profileimg"
            /></center>
            <strong className="m-3">Name :</strong> {item.uname} <br />
            <strong className="m-3">Email :</strong> {item.uemail} <br />
            <strong className="m-3">Password :</strong> {item.upassword}{" "}
            <br />
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="btn btn-danger m-2" onClick={handleViewReplay}>
          Edit
        </button>
      </div>
      {Showreplay && (
        <div className="p-3">
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Change Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Change Profile image
            </label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              onChange={handelemedia}
              required
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary m-2"
              onClick={handleChangePassword}
            >
              Save Password
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={handleChangeProfileImage}
            >
              Save Profile Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
