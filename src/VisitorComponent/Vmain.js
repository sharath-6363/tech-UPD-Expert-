import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../AllCss/Vmain.css";
import { useNavigate } from "react-router-dom";
export default function Vmain() {
  var navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/");
    }
  };
  return (
    <>
      <div className=" bg-danger navmine shadow " id="Admin-container">
        <ul className="nav nav-tabs py-2  justify-content-evenly " id="Admin-Ul">
          <li className="nav-item">
            <Link className="nav-link text-light fs-5" to="/vmain/">
              Update from Experts
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-light fs-5" to="/vmain/vprofile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light fs-5 "
              to="/"
              onClick={handleLogout}
            >
              Log-Out
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
}
