import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function SignUpTeacher() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/teacher/register", {
        email: email,
        password: password,
      });
      const data = response.data;
      if (data.message === "Teacher Already Exists") {
        alert("Teacher Already Exists");
      } else if (data.message === "Teacher Created Successfully") {
        alert("Registration Completed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="container custom-form"
      style={{ maxWidth: "40rem" }}
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <label
          htmlFor="exampleInputEmail1"
          className="form-label text-black fs-4"
          style={{ marginLeft: "-22rem" }}
        >
          Email address :
        </label>
        <input
          type="email"
          value={email}
          className="form-control custom-input"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="zaemon@gmail.com"
        />
      </div>
      <div className="mb-3" style={{ marginTop: "3rem" }}>
        <label
          htmlFor="exampleInputPassword1"
          className="form-label text-black fs-4"
          style={{ marginLeft: "-25.5rem" }}
        >
          Password :
        </label>
        <input
          type="password"
          value={password}
          className="form-control custom-input"
          id="exampleInputPassword1"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="#@zaemon123**"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary custom-button"
        style={{ marginTop: "2rem", marginLeft: "-26.5rem" }}
      >
        Sign Up
      </button>
    </form>
  );
}
