import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../AllCss/VRegister.css";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  var navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || agreeTerms === "") {
      setErrorMessage("Fill in all the required information!");
    } else if (password.length < 6) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        const response = await fetch("http://localhost:8080/PostRegister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname: name,
            uemail: email,
            upassword: password,
            agreeTerms: agreeTerms,
          }),
        });

        if (response.ok) {
          alert("Registration completed");
          navigate("/vLogin");
        } else {
          alert("Failed to register. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="Vregisterbg">
      <div className="row justify-content-center px-5">
        <div className="col-md-6 ">
          <div className="card mt-5 w-75 mx-auto shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-header bg-dark ">
              <h3 className="mx-auto text-center text-light">User Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div>
                {errorMessage && (
                  <p className="error mt-2 text-danger">{errorMessage}</p>
                )}
                <center>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </center>
                <div className="ORcss mx-auto text-center">
                  <hr className="w-50" />
                  <p className="mt-1 px-3">OR</p>
                  <hr className="w-50" />
                </div>
                <p className="text-center">
                  Already have an account? <Link to="/vLogin">Log In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
