import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import "../AllCss/TechMain.css"
export default function TechMain() {
  var navigate=useNavigate()
  const handleLogout = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/")

    }
  };
  return (
    <><div className=" bg-danger navmine shadow" id="Admin-container">
      
          <ul className="nav nav-tabs py-2  justify-content-evenly " id="Admin-Ul">
              <li className="nav-item ">
                  <Link  className="nav-link text-light fs-5 "  to="/techMain/">Update Tmformation</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link text-light fs-5 " to="/techMain/uPDprofil">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fs-5 " to="/techLogin" onClick={handleLogout}>Log-Out</Link>
              </li>
          </ul>
      </div><Outlet /></>
  )
}
