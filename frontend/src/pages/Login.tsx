import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const { setUsername } = useMyContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, password: user.password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        alert("Login failed")
        return;
      }

      setError("");
      setUsername(data.user.username);  
      alert(data.msg || "User login successfully")
      navigate("/");

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={submitHandler} className="login-form">
        <input type="text" name="username" id="username" value={user.username} onChange={changeHandler} placeholder="Username" />
        <input type="password" name="password" id="password" value={user.password} onChange={changeHandler} placeholder="Password" />
        <button className="login-btn">Login</button>
        <p>Don't you have an account? <NavLink className="no-account" to="/register" >Register</NavLink></p>
      </form>
    </div>
  )
}