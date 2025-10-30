import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { formatDate } from '../libs/datefunction';
import type { TripType } from '../libs/types';
import { API_URL } from '../libs/types';

export default function Trips() {
  const [trips, setTrips] = useState<TripType []>([]);

  useEffect(() => {
  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API_URL}/api/trip`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await res.json();
      setTrips(data.trips || []);
      console.log("Fetched trips:", data);
    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  };

  fetchTrips();
}, []);


  return (
    <div>
      <h1>Your Search Trips</h1>

      {trips.length === 0 && <p>No trips found yet</p>}

      <ul>
        { Object.values(trips).map((trip) => (
          <li key={trip.id}>
            <NavLink to={`/tripdetail/${trip.id}`}>
              {trip.city} (
              {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
              )
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
