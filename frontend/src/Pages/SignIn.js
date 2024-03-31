import React from "react";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <div>
      <Link className="nav-link" to="sign-in-student">
        I am a Student
      </Link>
      <Link className="nav-link" to="sign-in-teacher">
        I am a Teacher
      </Link>
    </div>
  );
}
