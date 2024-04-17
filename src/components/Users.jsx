import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import UserContent from "./UserContent";
import { useFirebase } from "../context/Firebase";

export default function Users() {
  const firebase = useFirebase();
  const [users, setUsers] = useState([]);
  const headers = ["ID", "Email", "Sign Up Time", "Password", "IP"];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const user = firebase.loggedInUser();
        if (!user) {
          console.log("No user logged in.");
          return;
        }

        const users = await firebase.getUsersFromFirestore();
        setUsers(users);

        console.log("Users retrieved:", users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <Admin></Admin>
      <UserContent headers={headers} users={users} />
    </div>
  );
}
