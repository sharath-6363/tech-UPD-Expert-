import React from "react";
import { useState } from "react";
import "../AllCss/Login.css";
import { useNavigate } from "react-router-dom";

function ALogin(props) {
var navigate=useNavigate()
const [email,setemai]=useState("")
const [password,setpassword]=useState("")
const [loginstatus,setloginstatus]=useState("")
const handellogin = async (e) => {
  e.preventDefault();
  if (email === "" || password === "") {
    setloginstatus("Fill all requirment");
  } else
    try {
      const response = await fetch("http://localhost:8080/adminlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ademail: email,
          adpassword: password,
          logintype: "admin",
        }),
      });

      if (response.ok) {

        navigate("/adminMain");
      } else {
        setloginstatus("Login failed. Please check your credentials.");
      }
    } catch (hi) {
      setloginstatus(
        "An error occurred during login. Please try again later."
      );
    }
};

  return (
    
    <div className="bg-login">
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title"> Admin Log-in</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
              onChange={(e)=>setemai(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              onChange={(e)=>setpassword(e.target.value)}
            />
          </div>
          <p className="text-danger">{loginstatus}</p>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handellogin} className="btn btn-primary">
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>  
  );
}

export default ALogin;
