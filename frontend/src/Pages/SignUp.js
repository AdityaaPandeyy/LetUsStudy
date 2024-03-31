import React from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div>
      <Link className="nav-link" to="sign-up-student">
        I am a Student
      </Link>
      <Link className="nav-link" to="sign-up-teacher">
        I am a Teacher
      </Link>
    </div>
  );
}
