import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Task_Lists from "./components/Task_Lists";
import Users from "./components/Users";
import Tasks from "./components/Tasks";
import { useFirebase } from "./context/Firebase";

function App() {
  const firebase = useFirebase();

  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const checkAuthState = firebase.loggedInUser();
    setLoggedInUser(checkAuthState);
    setLoading(false);
  }, [firebase, loggedInUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={loggedInUser ? <Navigate to={"/users"} /> : <SignUp />}
        ></Route>
        <Route
          path="/login"
          element={loggedInUser ? <Navigate to={"/users"} /> : <Login />}
        ></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route
          path="/users"
          element={loggedInUser ? <Users /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/task-lists"
          element={loggedInUser ? <Task_Lists /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/tasks"
          element={loggedInUser ? <Tasks /> : <Navigate to={"/login"} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
