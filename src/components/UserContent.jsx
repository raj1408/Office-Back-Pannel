import React from "react";

export default function UserContent(props) {
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
          {props.users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.password}</td>
              <td>{user.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
