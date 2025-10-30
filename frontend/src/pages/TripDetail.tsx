
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../libs/types";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTripDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/trip/detail/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Failed to fetch trip details (status ${res.status})`);

        const data = await res.json();
        console.log("Fetched trip response:", data);

        // backend might return { trip: {...} } or the trip object directly
        const tripData = data.trip ?? data;
        setTrip(tripData);
      } catch (err) {
        console.error(err);
        setError("Unable to load trip details");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetail();
  }, [id]);

  if (loading) return <div>Loading trip details...</div>;
  if (error) return <div>{error}</div>;
  if (!trip) return <div>No trip found.</div>;

  // Build itinerary robustly: handle Array, object with .data, JSON-string, or planRaw
  let itinerary: any[] = [];

  // 1) plan is already an array
  if (Array.isArray(trip.plan)) {
    itinerary = trip.plan;
    console.log("Using trip.plan as itinerary");
  }
  // 2) plan is object with a data array: { data: [ ... ] }
  else if (trip.plan && Array.isArray(trip.plan.data)) {
    itinerary = trip.plan.data;
    console.log("Using trip.plan.data as itinerary");
  }
  // 3) plan is a JSON string (possibly containing .data)
  else if (typeof trip.plan === "string" && trip.plan.trim() !== "") {
    try {
      const parsed = JSON.parse(trip.plan);
      if (Array.isArray(parsed)) {
        itinerary = parsed;
        console.log("Parsed trip.plan string into itinerary (array)");
      } else if (parsed && Array.isArray(parsed.data)) {
        itinerary = parsed.data;
        console.log("Parsed trip.plan string into itinerary (parsed.data)");
      } else {
        console.warn("Parsed trip.plan string has unexpected shape:", parsed);
      }
    } catch (err) {
      console.error("Failed to parse trip.plan string:", err);
    }
  }
  // 4) fallback to planRaw (array or JSON string)
  else if (trip.planRaw) {
    if (Array.isArray(trip.planRaw)) {
      itinerary = trip.planRaw;
      console.log("Using trip.planRaw as itinerary");
    } else if (typeof trip.planRaw === "string") {
      try {
        const parsed = JSON.parse(trip.planRaw);
        if (Array.isArray(parsed)) {
          itinerary = parsed;
          console.log("Parsed trip.planRaw into itinerary");
        } else if (parsed && Array.isArray(parsed.data)) {
          itinerary = parsed.data;
          console.log("Parsed trip.planRaw.data into itinerary");
        } else {
          console.warn("Parsed trip.planRaw has unexpected shape:", parsed);
        }
      } catch (err) {
        console.error("Failed to parse planRaw:", err);
      }
    }
  }

  console.log("Trip data:", trip);
  console.log("Itinerary:", itinerary);

  if (!itinerary || itinerary.length === 0) {
    return <div>No itinerary available for this trip.</div>;
  }

  const startDate = itinerary[0]?.date ? new Date(itinerary[0].date) : null;
  const endDate = itinerary[itinerary.length - 1]?.date ? new Date(itinerary[itinerary.length - 1].date) : null;
  const durationDays = startDate && endDate ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

  return (
    <div style={{ marginTop: "20px" }}>
      <h1>
        {trip.city} ·{" "}
        {startDate && endDate
          ? `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${durationDays} day${durationDays > 1 ? "s" : ""}`
          : ""}
      </h1>

      {itinerary.map((day, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2>
            📅 {day.date ? new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Unknown date"}
          </h2>

          {["morning", "afternoon", "evening"].map((time) => {
            const activities = Array.isArray(day[time]) ? day[time] : [];
            if (activities.length === 0) return null;

            return (
              <div key={time} style={{ marginLeft: "20px", marginTop: "10px" }}>
                <h3>
                  {time === "morning" && "🌅 Morning"}
                  {time === "afternoon" && "🌞 Afternoon"}
                  {time === "evening" && "🌙 Evening"}
                </h3>
                <ul>
                  {activities.map((activity: any, i: number) => (
                    <li key={i}>
                      <strong>{activity.activity}</strong>
                      {activity.food && ` 🍽️ (${activity.food})`}
                      {activity.landmark && " 🏛️"}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
