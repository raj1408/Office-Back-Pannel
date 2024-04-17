import React from "react";

export default function TaskListContent(props) {
  return (
    <div>
      <table className="table-content">
        <thead>
          <tr>
            {props.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.taskLists.map((taskList, index) => (
            <tr key={index}>
              <td>{taskList.todoTitle}</td>
              <td>{taskList.totalTasks}</td>
              <td>{taskList.userEmail}</td>
              <td>{taskList.createdAt}</td>
              <td>{taskList.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
