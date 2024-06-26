import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../AllCss/UPDprofile.css";
import { usercontext } from "../Usercontext.js";
// import { useNavigate } from "react-router-dom";
export default function Vprofile() {
  const { userdata } = useContext(usercontext);
  const [Showreplay, setShowreplay] = useState(false);
  const [userData, setUserData] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [newImage, setNewImage] = useState("");
  
// var navigator=useNavigate()
  const handelemedia = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewImage(reader.result);
    };
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAddtech");
        const userdatas = response.data.filter(
          (item) => item.aemail === userdata.aemail
        );
        setUserData(userdatas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userdata]); 

  const handleViewReplay = () => {
    setShowreplay(!Showreplay);
  };
 

  const handleUpdateProfile = async () => {
    if(newImage===""){
      alert("Select Profile Image")
    }else{
    try {
      const userId = userData[0].id;
      const response = await axios.put(
        `http://localhost:8080/putupdate/${userId}`,
        {
          ...userData[0],
          imageprof: newImage,
        }
      );
      if (response.status === 200) {
        
        alert("Profile Updated ");
        window.location.reload();
        // navigator("/techLogin")
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  }
  const handelepsswordupdte = async () => {
    if (newPassword === "") {
      alert("Password not found to update");
    } else {
      try {
        const userId = userData[0].id;
        const responses = await axios.put(
          `http://localhost:8080/putupdate/${userId}`,
          {
            ...userData[0],
            apassword: newPassword,
          }
        );
        if (responses.status === 200) {
          alert("Password updated");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error updating Profile", error);
      }
    }
  };

  return (
    <div className="card w-25 mx-auto mt-3 p-3 shadow">
      <h2 className="text-center">Profile</h2>

      {userData.map((item, index) => (
        <div key={index}>
          <div className="text-center">
          <img
            src={item.imageprof}
            alt="profile"
            className="profileimg "
          /></div>
          <div className="p-3">
          <p><strong>Name : </strong> {item.aname}</p>
          <p><strong>Email : </strong> {item.aemail}</p>
          <p><strong>Expertise : </strong> {item.expertise}</p>
          <p><strong>Password : </strong> {item.apassword}</p>
          </div>
        </div>
      ))}
      <div className="text-center">
        <button className="btn btn-danger m-2 " onClick={handleViewReplay}>
          Edit
        </button>
      </div>
      {Showreplay && (
        <div>
          <p className="mx-4">
            Change Password:{" "}
            <input
              className="form-control"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </p>
          <p className="mx-4">
            Change Profile Image:{" "}
            <input
              className="form-control"
              type="file"
              onChange={handelemedia}
            />
          </p>
          <div className="text-center">
            <button
              className="btn btn-primary m-2"
              onClick={handleUpdateProfile}
            >
              Update Image
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={handelepsswordupdte}
            >
              Update Password
            </button>
          
          </div>
        </div>
      )}
    </div>
  );
}

