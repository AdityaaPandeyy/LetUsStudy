import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function SignInStudent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.message === "User Doesn't Exist") {
        alert("User Doesn't Exist");
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
        Sign In
      </button>
    </form>
  );
}
