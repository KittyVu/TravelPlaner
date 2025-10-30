import { useEffect, useState } from "react";
import { useMyContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { userid } = useMyContext();
  const [name, setName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [foods,setFoods] = useState("");
  const [style,setStyle] = useState("");
  const [budget,setBudget] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
     fetch("https://travelplaner.onrender.com/api/user/profile", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: userid }),
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.profile.username);
        setEmail(data.profile.email);
        setFoods(data.profile.UserReference?.favoriteFoods);
        setStyle(data.profile.UserReference?.travelStyle);
        setBudget(data.profile.UserReference?.budget);
        console.log("Profile data:", data);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
      });
  }, [userid]);

  const profileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user/profile", {  
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: userid, password, email, favoriteFoods: foods, travelStyle: style, budget }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile update response:", data);
        alert("Profile updated successfully");
        navigate("/");

      })
      .catch((err) => {
        console.error("Profile update error:", err);
      });
  }

  return (
    <div>
      <h1>Your Profile</h1>
      {name && (
        <form className="profile" onSubmit={profileUpdate}>
          <label htmlFor="username">Username: </label>
          <input type="text" value={name} readOnly />

          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="style">Travel style</label>
          <select name="style" value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">Select style</option>
            <option value="general">General</option>
            <option value="explorer">Explorer</option>
            <option value="relaxation">Relaxation</option>
            <option value="cultural">Cultural</option>  
            <option value="nature">Nature</option>
            <option value="food">Food</option>
            <option value="luxury">Luxury</option>
          </select>

          <label htmlFor="budget">Budget</label>
          <select name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Select budget</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>  
          </select>  

          <label htmlFor="foods">Favourite foods</label>
          <select name="foods" value={foods} onChange={(e) => setFoods(e.target.value)}>
            <option value="">Select favorite foods</option>
            <option value="local foods">Local foods</option>
            <option value="street food">Street food</option>  
            <option value="fine dining">Fine dining</option>
          </select>
          <button type="submit">Update Profile</button>
      </form>
      )}
    </div>
  )
}
