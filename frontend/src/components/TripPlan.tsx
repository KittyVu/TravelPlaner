
export default function TripPlan({ plan, city }) {
  // ✅ Safely extract itinerary from any structure the LLM returns
  const itinerary: any[] =
    plan?.data ||
    plan?.trips ||
    (Array.isArray(plan) ? plan : []) ||
    [];

  console.log("Trip data:", plan);
  console.log("Itinerary:", itinerary);

  // ✅ Ensure itinerary is valid and non-empty
  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return <div>No itinerary available for this trip.</div>;
  }

  const startDate = itinerary[0]?.date ? new Date(itinerary[0].date) : null;
  const endDate = itinerary[itinerary.length - 1]?.date
    ? new Date(itinerary[itinerary.length - 1].date)
    : null;
  const durationDays =
    startDate && endDate
      ? Math.round(
          (endDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  return (
    <div style={{ marginTop: "20px" }}>
      <h1>
        {city} ·{" "}
        {startDate && endDate
          ? `${startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })} – ${endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })} · ${durationDays} day${
              durationDays > 1 ? "s" : ""
            }`
          : ""}
      </h1>

      {itinerary.map((day, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2>
            📅{" "}
            {day.date
              ? new Date(day.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown date"}
          </h2>

          {["morning", "afternoon", "evening"].map((time) => {
            const activities = Array.isArray(day[time]) ? day[time] : [];
            if (activities.length === 0) return null;

            return (
              <div
                key={time}
                style={{ marginLeft: "20px", marginTop: "10px" }}
              >
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
