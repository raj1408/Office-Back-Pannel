import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

export default function Admin() {
  const [activeLink, setActiveLink] = useState("");

  const firebase = useFirebase();
  const user = firebase.loggedInUser();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      <div className="nav">
        <ul>
          <li>
            <Link
              to="/users"
              className={activeLink === "/users" ? "active" : ""}
              onClick={() => handleLinkClick("/users")}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/task-lists"
              className={activeLink === "/task-lists" ? "active" : ""}
              onClick={() => handleLinkClick("/task-lists")}
            >
              Task Lists
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className={activeLink === "/tasks" ? "active" : ""}
              onClick={() => handleLinkClick("/tasks")}
            >
              Tasks
            </Link>
          </li>
        </ul>
      </div>
      <div className="control">
        <h4>{user?.email}</h4>
        <button
          className="button-out"
          onClick={(e) => {
            firebase.logOutUser();
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
