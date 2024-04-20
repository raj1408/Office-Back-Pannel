import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFirebase } from "../context/Firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [activeLink, setActiveLink] = useState("");

  const firebase = useFirebase();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleInputChange = (e) => {
    setIsActive(e.target.value !== "");
  };

  const handleInputEmailChange = (e) => {
    handleInputChange(e);
    setEmail(e.target.value);
    console.log(email);
  };

  const handleInputPasswordChange = (e) => {
    handleInputChange(e);
    setPassword(e.target.value);
    console.log(password);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await firebase.loginUser(email, password);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="form">
      <ul className="tab-group">
        <li className="tab">
          <Link
            to="/"
            className={activeLink === "/" ? "active" : ""}
            onClick={() => handleLinkClick("/")}
          >
            Log In
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        <div id="login">
          <h1>Welcome Back!</h1>

          <form action="/" method="post">
            <div className="field-wrap">
              <label className={isActive ? "active highlight" : ""}>
                Email Address<span className="req">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                onChange={(e) => {
                  handleInputEmailChange(e);
                }}
              />
            </div>

            <div className="field-wrap">
              <label className={isActive ? "active highlight" : ""}>
                Password<span className="req">*</span>
              </label>
              <input
                type="password"
                required
                autoComplete="off"
                onChange={(e) => {
                  handleInputPasswordChange(e);
                }}
              />
            </div>

            <p className="forgot">
              <a href="#">Forgot Password?</a>
            </p>

            <button className="button button-block" onClick={loginUser}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
