import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/AppContext";

export default function Header() {
  const { username, setUsername, setUserid, setIsLoggedIn } = useMyContext();
  const navigate = useNavigate();

  // logout using cookie
  const logout = async () => {
    await fetch("https://travelplaner.onrender.com/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setUsername("");
    setUserid(null);
    setIsLoggedIn(false);
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
          <NavLink className={({ isActive }) => isActive ? "navlink active" : "navlink"} to="/trips">Your search</NavLink>
          <NavLink className="header-name" to="/profile"><p className="welcome">Welcome, {username}</p></NavLink>
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