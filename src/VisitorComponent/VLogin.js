import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../AllCss/VLogin.css";
import { useState } from "react";
import { Visitorcontext } from "../Visitorcontext.js";
export default function VLogin() {
  const {setviconst}=useContext(Visitorcontext)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loginstatus, setloginstatus] = useState("")
  let navigate = useNavigate();

  const handellogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setloginstatus("Fill all requirment");
    } else
      try {
        const response = await fetch("http://localhost:8080/loginvisitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uemail: email,
            upassword: password,
            logintype: "userlogin",
          }),
        });

        if (response.ok) {
          const vuserdata = await response.json();
          setviconst(vuserdata);
          navigate("/vmain");
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
    <div className="vloginbg ">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5 w-75 mx-auto ">
              <div className="card-header bg-dark">
                <h3 className="text-center text-light">User-Login</h3>
              </div>
              <div className="card-body ">
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="email" onChange={(e)=>setemail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={(e)=>setpassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <center>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handellogin}
                    >
                      Login
                    </button>
                    <p className="text-danger">{loginstatus}</p>
                    <p className="text-center">
                      <div className="ORcss mx-auto">
                        <hr className="w-50" /> <p className="mt-1 px-3">OR</p>{" "}
                        <hr className="w-50" />{" "}
                      </div>
                      Don't have any Account?
                      <Link to="/vRegister">Register</Link>
                    </p>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
