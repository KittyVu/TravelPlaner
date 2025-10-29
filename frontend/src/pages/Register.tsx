import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "", cpassword: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  function changeHandler (event: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user.password !== user.cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, email:user.email, password: user.password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Registration failed");
        return;
      }

      setError("");
      setUser({ username: "", email: "", password: "", cpassword: "" });
      alert(data.msg || "User registered successfully")
      navigate("/login");

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={submitHandler} className="register-form">
        {error && <p className="notification">{error}</p>}
        <input type="text" name="username" value={user.username} onChange={changeHandler} placeholder="Username" />
        <input type="email" name="email" value={user.email} onChange={changeHandler} placeholder="Email" />
        <input type="password" name="password" value={user.password} onChange={changeHandler} placeholder="Password" />
        <input type="password" name="cpassword" value={user.cpassword} onChange={changeHandler} placeholder="Confirm Password" />
        <button className="register-btn">Register</button>
        <p>Do you have an account? <NavLink className="no-account" to="/login">Login</NavLink></p>
      </form>
    </div>
  );
}