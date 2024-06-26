import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../AllCss/AdminMain.css";
import { useNavigate } from "react-router-dom";

export default function AdminMain() {
  var navigate=useNavigate()
  const handleLogout = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/")

    }
  };

  return (
    <>
      <div className="bg-danger navmine shadow" id="Admin-container">
        <ul className="nav nav-tabs nav- py-2 text-center justify-content-evenly" id="Admin-Ul">
          <li className="nav-item">
            <Link className="nav-link   text-light fs-5" to="/AdminMain/">
              Add Tech Experts
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light fs-5"
              to="/AdminMain/updateCategory"
            >
              Update Category
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            <Link
              className="nav-link text-light fs-5"
              to="/AdminMain/viewUpdates"
            >
              View Updates
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light fs-5"
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
