import { useState } from 'react';
import TripPlan from '../components/TripPlan';
import { useMyContext } from "../context/AppContext";
import LoadingSpinner from '../components/Loading';

export default function TripPLaner() {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [plan, setPlan] = useState(null);
  const [plancity, setPlancity] = useState('');
  const { userid } = useMyContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const safeParse = (v: any) => {
    if (!v) return null;
    if (typeof v === "string") {
      try { return JSON.parse(v); } catch (e) { console.warn("Failed to parse plan string:", e); return null; }
    }
    return v;
  };

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/trip', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userid ?? 1, city, startDate, endDate }), 
        credentials: "include",
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data?.message || "Server error");
        return;
      }

      const planObj = safeParse(data.plan) ?? safeParse(data.planRaw);

      if (planObj) {
        setPlan(planObj);
        setPlancity(data.city || city);
        setError("");
      } else {
        setError("No plan returned.");
      }

    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const newSearch = () => {
    setCity('');
    setStartDate('');
    setEndDate('');
    setPlan(null);
    setPlancity('');
    setError('');
  }

  return (
    <div className='ask-form'>
      <h2>Plan your trip</h2>
      <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleGenerate}>Generate Trip Plan</button>
      <button onClick={newSearch}>New Search</button>

      {loading && <LoadingSpinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {plan && !loading && <TripPlan plan={plan} city={plancity} />}
    </div>
  )
}