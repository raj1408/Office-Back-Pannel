import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import Admin from "./Admin";
import TaskListContent from "./TaskListContent";
export default function Task_Lists() {
  const [taskLists, setTaskLists] = useState([]);
  const headers = [
    "Task List Name",
    "No. of Tasks",
    "Created By",
    "Created At",
    "Last Updated At",
  ];
  const firebase = useFirebase();
  const user = firebase.loggedInUser();

  useEffect(() => {
    const getTaskLists = async () => {
      try {
        const user = firebase.loggedInUser();
        if (!user) {
          return;
        }
        const taskLists = await firebase.getToDoLists(user);
        setTaskLists(taskLists);
        console.log(taskLists);
      } catch (error) {
        console.error(error.message);
      }
    };

    getTaskLists();
  }, [firebase]);

  return (
    <div>
      <Admin></Admin>
      <TaskListContent headers={headers} taskLists={taskLists} />
    </div>
  );
}
