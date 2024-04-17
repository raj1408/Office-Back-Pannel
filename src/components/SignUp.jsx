import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isActive, setIsActive] = useState(false);

  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleInputChange = (e) => {
    setIsActive(e.target.value !== "");
  };
  return (
    <div className="form">
      <ul className="tab-group">
        <li className="tab active">
          <Link
            to="/"
            className={activeLink === "/" ? "active" : ""}
            onClick={() => handleLinkClick("/")}
          >
            Sign Up
          </Link>
        </li>
        <li className="tab">
          <Link
            to="/login"
            className={activeLink === "/login" ? "active" : ""}
            onClick={() => handleLinkClick("/login")}
          >
            Log In
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        <div id="signup">
          <h1>Sign Up for Free</h1>

          <form action="/" method="post">
            <div className="top-row">
              <div className="field-wrap">
                <label className={isActive ? "active highlight" : ""}>
                  First Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field-wrap">
                <label className={isActive ? "active highlight" : ""}>
                  Last Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="field-wrap">
              <label className={isActive ? "active highlight" : ""}>
                Email Address<span className="req">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>

            <div className="field-wrap">
              <label className={isActive ? "active highlight" : ""}>
                Set A Password<span className="req">*</span>
              </label>
              <input
                type="password"
                required
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="button button-block">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
