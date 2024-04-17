import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import Content from "./Content";
import { useFirebase } from "../context/Firebase";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const firebase = useFirebase();
  const headers = [
    "ID",
    "Name",
    "Description",
    "Task List",
    "Created By",
    "Created At",
  ];
  const user = firebase.loggedInUser();
  console.log(tasks);

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (!user) {
          return;
        }

        setTasks(await firebase.getTasksFromFirestore());
      } catch (error) {
        console.error(error.message);
      }
    };

    getTasks();
  }, [user, firebase]);

  return (
    <div>
      <Admin></Admin>
      <Content headers={headers} tasks={tasks} />
    </div>
  );
}
