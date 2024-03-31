import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Navbar,
  Home,
  SignUp,
  SignIn,
  SignUpTeacher,
  SignInTeacher,
  SignUpStudent,
  SignInStudent,
} from "./Pages";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up/sign-up-teacher" element={<SignUpTeacher />} />
          <Route path="/sign-in/sign-in-teacher" element={<SignInTeacher />} />
          <Route path="/sign-up/sign-up-student" element={<SignUpStudent />} />
          <Route path="/sign-in/sign-in-student" element={<SignInStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
