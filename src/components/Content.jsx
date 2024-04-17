import React from "react";

export default function Content(props) {
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
          {props.tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.todoTitle}</td>
              <td>{task.userEmail}</td>
              <td>{task.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
