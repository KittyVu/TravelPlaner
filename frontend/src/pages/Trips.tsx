import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { formatDate } from '../libs/datefunction';

export default function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch trips from backend API
    const fetchTrips = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/trip/1`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json(); console.log("Fetched trips:", data);
        setTrips(data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    }

    fetchTrips();
  }, []);

  return (
    <div>
      <h1>Your Trips</h1>
      <ul>
        {trips.map((trip: any) => (
          <li key={trip.id}>
            <p><NavLink to={`/tripdetail/${trip.id}`}>
              {trip.city} (
              {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
              )
            </NavLink></p>
          </li>
        ))}
      </ul>
    </div>
  )
}
