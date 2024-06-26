import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AllCss/AddtechEx.css";
// import { useNavigate } from "react-router-dom";
import Email from "./Email"
export default function AddTechnologyExpertForm() {
  // var navigate=useNavigate()
  const [errorMs, setErrorMs] = useState("");
  const [Aname, setAname] = useState("");
  const [Aemail, setAemail] = useState("");
  const [Apassword, setApassword] = useState("");
  const [Expertise, setExpertise] = useState("");
  const [Updates, setUpdates] = useState([]);
  const [bol,setbol]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAddtech");
        setUpdates(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Aname === "" || Aemail === "" || Apassword === "" || Expertise === "") {
      setErrorMs("Fill in all the required information!");
    } else if (Apassword.length < 6) {
      setErrorMs("Passwords must be at least 6 characters long");
    } else {
      try {
        const response = await axios.post("http://localhost:8080/Addtechs", {
          aname: Aname,
          aemail: Aemail,
          apassword: Apassword,
          expertise: Expertise,
        });

        if (response.status === 200) {
          alert("Tech Add completed");
          window.location.reload();
        } else {
          setErrorMs("Failed to register. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrorMs("An error occurred. Please try again later.");
      }
    }
  };

  

  return (
    <>
      <div className=" mt-3 card w-25 m-5 p-3 shadow-lg p-3 mb-5 bg-white rounded">
        <h2 className="text-center d-flex">Add Technology Expert</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control "
              id="name"
              name="name"
              value={Aname}
              onChange={(e) => setAname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expertise" className="form-label">
              Expertise
            </label>
            <input
              type="text"
              className="form-control"
              id="expertise"
              name="Expertise"
              value={Expertise}
              onChange={(e) => setExpertise(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={Aemail}
              onChange={(e) => setAemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={Apassword}
              onChange={(e) => setApassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-danger "
              onClick={handleSubmit}
            >
              Submit
            </button>
            <p className="text-danger">{errorMs}</p>
          </div>
        </form>
      </div>
      
      <div className=" mx-auto " id="Allregisterd">
        <h4 className="mx-auto text-center border border-black rounded bg-body-secondary p-2 text-danger w-50 ">Added Technology Experts</h4>
        <ul className=" " >
          {Updates.map((item) => (
            <>
            <div className="card m-3 d-inline-flex p-2 shadow">
              <p className="mx-2">
                <b>Name :  </b>{item.aname}
              </p>
              <p className="mx-2">
                <b>Email : </b>{item.aemail}
              </p>
              <p className="mx-2">
             <b> Expertise : </b>{item.expertise}
              </p>
              <p className="mx-2">
                <b>Password : </b>{item.apassword}
              </p>
              <div className="mx-auto ">
                <button className="btn btn-primary " onClick={()=>{setbol(true)}}>send email</button>
              </div>
              </div>
              {bol && <div><Email setbol={setbol}/></div>}
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
