import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../AllCss/TechLogin.css";
import { usercontext } from "../Usercontext.js";
function ALogin() {
  const{setuserdata}=useContext(usercontext)
  const [vemail, setvemail] = useState("")
  const [vpassword, setvpassword] = useState("")
  const [loginstatus, seloginstatus] = useState("")
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (vemail === "" || vpassword === "") {
      seloginstatus("Fill all requirment");
    } else
      try {
        const response = await fetch("http://localhost:8080/logintech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aemail: vemail,
            apassword: vpassword,
           
          }),
        });

        if (response.ok) {
          const vuserdata = await response.json();
          setuserdata(vuserdata);
          navigate("/techMain");
        } else {
          seloginstatus("Login failed. Please check your credentials.");
        }
      } catch (hi) {
        seloginstatus(
          "An error occurred during login. Please try again later."
        );
      }
  };
  


  return (
    <div className="bg-login">
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title"> Tech Log-in</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e)=>setvemail(e.target.value)}
                
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e)=>setvpassword(e.target.value)}
                
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                onClick={handleLogin} 
                className="btn btn-primary"
              >
                Log In
              </button>
              <p className="text-danger">{loginstatus}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ALogin;
