import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Home() {
  const [assignments, setAssignments] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const teacherID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const allAssignments = [];
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const assignmentsID = await axios.get(
          `http://localhost:3001/assignment/teacher/${teacherID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const assignmentsIDArray = assignmentsID.data;
        console.log(assignmentsIDArray);
        for (const assignmentID of assignmentsIDArray) {
          // console.log(assignmentID);
          try {
            const assignment = await axios.get(
              `http://localhost:3001/assignment/${assignmentID}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // console.log(assignment.data.assignment);
            allAssignments.push(assignment.data.assignment);
          } catch (error) {
            console.log(error);
          }
        }
        if (cookies.access_token) setAssignments(allAssignments);
        console.log(allAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    if (cookies.access_token) fetchAssignments();
  }, [cookies.access_token]);
  return (
    <div>
      <h1>Assignment</h1>
      {assignments.map((assignment) => (
        <li key={assignment._id}>
        <p>URL: {assignment.assignmentUrl}</p>
      </li>
      ))}
    </div>
  );
}
// {assignments.map((assignment) => (
  // <li key={assignment._id}>
  //   <p>URL: {assignment.assignmentUrl}</p>
  // </li>
// ))}
