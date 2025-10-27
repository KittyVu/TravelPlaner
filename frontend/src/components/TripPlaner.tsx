import React, { useState } from 'react';
import axios from 'axios';
import TripPlan from './TripPlan';
import { useMyContext } from "../context/AppContext";

export default function TripPlanner() {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [plan, setPlan] = useState(null);
  const { userid } = useMyContext(); console.log("UserID in TripPlanner:", userid);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/trip', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, city, startDate, endDate }),
        credentials: "include",
      });
      const data = await res.json();
      setError("");
      setPlan(data.plan);

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleGenerate}>Generate Trip Plan</button>

      {plan && <TripPlan plan={plan} />}
    </div>
  );
}
