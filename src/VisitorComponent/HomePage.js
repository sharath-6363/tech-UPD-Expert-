import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import "../AllCss/HomePage.css";
import Home from "../Image/Homepage.jpg";
import axios from "axios";
import { FaLongArrowAltUp } from "react-icons/fa";


const HomePage = () => {
  const [getdata, setgetdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/gettechUpd");
        setgetdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);
  return (
    <div className="" id="home">
      <nav className="navbar navbar-expand-lg navbar-light navadd sticky-top bg-secondary" id="home">
        <div className="container">
          <Link id="link-navbar" className="navbar-brand text-light" to="/">
            Tech Updates
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav" id="home-ul">
              <li className="nav-item">
                <a
                  href="#home"
                  id="link-navbar"
                  className="nav-link text-light fs-5"
                >
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a
                  href="#update"
                  id="link-navbar"
                  className="nav-link text-light fs-5 mx-3"
                  to="/updates"
                >
                  Updates
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link text-light btn btn-link dropdown-toggle mx-4 fs-5 "
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Log-In As <CgLogOut />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/vLogin">
                      Log-In User
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/techLogin">
                      Log-in Tech
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/aLogin">
                      Log-In Admin
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <img className="homeimg" src={Home} alt="homepage"></img>
      <div className="container mt-4">
        <div className="welcomeH1">
          <h1 className="">Welcome to Tech Updates.. </h1>
        </div>
        <div className="displa " id="update">
          {getdata.map((item, index) => (
            <>

              <div className="card mt-2 mb-1 shadow mx-3 cat  ">
                <p className=" p-2 " key={index}><strong>From : </strong>{item.names}</p>
                <h5 className="p-2">{item.category}

                </h5>
                <Link className="btn text-primary" to="/vLogin">
                  Learn More
                </Link>
              </div>
            </>
          ))}</div>

      </div>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <footer class="col-12 bg-dark text-white py-5">
            <div class="col-md-4 text-center d-flex">
              <a href="#home" class="text-white text-decoration-none fs-2 my-2 d-block">
                <i class="bi bi-house-door fs-2"></i>
                <FaLongArrowAltUp className="bg-white text-dark rounded-2 arowup" />

              </a>
            </div>
            <div className="d-flex justify-content-around">
              <div class="col-md-4 text-center ">
                <p class="fs-4 mb-4">Users</p>
                <h1 class="text-light">100+</h1>
              </div>
              <div>
                <p className="m-5">@ Thech Updates form Experts</p>

                <p className="text-center"></p>
              </div>
              <div class="col-md-4 text-center">
                <p class="fs-4 mb-4">Experts</p>
                <h1 class="text-light">50+</h1>
              </div>
            </div>
          </footer>
        </div>
      </div>    
    </div>
  );
};

export default HomePage;
