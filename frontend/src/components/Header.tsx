import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export default function Header() {
  const { username, setUsername } = useMyContext();
  const navigate = useNavigate();

  // logout using cookie
  const logout = async () => {
    await fetch("http://localhost:5000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setUsername("");
    navigate("/login");
  }
  return (
    <header>
      <nav>
        <ul className="menu">
          <li>
            <NavLink className={({ isActive }) => isActive ? "navlink active" : "navlink"} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? "navlink active" : "navlink"} to="/contact">Contact</NavLink>
          </li>

        </ul>
      </nav>

      {username ? (
        <>
          <NavLink className={({ isActive }) => isActive ? "navlink active" : "navlink"} to="/trips">Your trips</NavLink>
          <p className="welcome">Welcome, {username}</p>
          <button onClick={logout} className="login-btn">Logout</button>
        </>
      ) : (
        <div className="login">
          <NavLink className={({ isActive }) => isActive ? "navlink active" : "navlink"} to="/login">Login</NavLink>
          <NavLink className={({ isActive }) => isActive ? "navlink active" : "navlink"} to="/register">Register</NavLink>
        </div>
      )}
    </header>
  );
}