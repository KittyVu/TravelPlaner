import type { Request, Response } from 'express';
import ollama from "ollama";
import Trips from '../models/Trips';
import TripPlans from '../models/TripPlans';
import UserReference from '../models/UserReferences';
import type { UserPreferenceType, TripType, TripPlanType } from '../libs/types';

export const tripPlan = async (req: Request, res: Response) => {
  try {
    const { userid, city, startDate, endDate } = req.body;

    // Get user references
    const userPref = await UserReference.findOne({ where: { userid } }) as UserPreferenceType | null;
    const lastTrip = await Trips.findOne({
      where: { userid },
      order: [["createdAt", "DESC"]],
    }) as TripType | null;

    // Create context for LLM
    const context = `
Travel style: ${userPref?.travelStyle || "general tourism"}
Budget: ${userPref?.budget || "medium"}
Favorite foods: ${userPref?.favoriteFoods || "local foods"}
Last trip: ${lastTrip?.city || "none"} (${lastTrip?.startDate || ""} - ${lastTrip?.endDate || ""})
`;

    const prompt = `
Plan a trip to ${city} from ${startDate} to ${endDate}.

Return JSON ONLY using the exact structure below.
Wrap the array in an object with the key "data". 
Do NOT use "trip", "trips", "result", or any other key name.

Format:
{
  "data": [
    {
      "date": "YYYY-MM-DD",
      "morning": [{"activity": "", "food": ""}],
      "afternoon": [{"activity": "", "landmark": true}],
      "evening": [{"activity": "", "food": ""}]
    }
  ]
}

Rules:
1. Use ONLY the "data" key at the top level.
2. Every date must include morning, afternoon, and evening.
3. JSON only — no text outside JSON.

User profile:
${context}
`;

    // ✅ Ask Ollama for JSON only
    const response = await ollama.chat({
      model: "llama3",
      messages: [{ role: "user", content: prompt }],
      format: "json",
    });

    // ✅ Always valid JSON here
    const planJson = JSON.parse(response.message.content);
    let tripId: number | null = null;

    if (userid) {
      // ✅ Save trip first
      const trip = await Trips.create({ userid, city, startDate, endDate }) as TripType | any;
      tripId = trip.id;
      // ✅ Save plan JSON into Postgres
      await TripPlans.create({
        tripid: tripId,
        plan: planJson,
      });

    }

    // Send proper JSON response
    const responseData: any = { plan: planJson, city: city };
    if (tripId) {
      responseData.tripid = tripId;
    }

    return res.json(responseData);


  } catch (error) {
    console.error("Generate trip plan failed:", error);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
};

export const tripList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;   // <- from the middleware
    if (!userId) return res.status(401).json({ success: false, msg: "Unauthorized" });

    const trips = await Trips.findAll({ where: { userid: userId } });
    res.json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


export const tripDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tripPlan = await TripPlans.findOne({
    where: { tripid: id },
    include: [Trips]
  }) as (TripPlanType & { Trip?: TripType }) | null;

  if (!tripPlan) return res.status(404).json({ error: "Trip not found" });

  res.json({
    tripid: tripPlan.tripid,
    city: tripPlan.Trip?.city || "Unknown",
    startDate: tripPlan.Trip?.startDate || null,
    endDate: tripPlan.Trip?.endDate || null,
    plan: tripPlan.plan || null,
    planRaw: tripPlan.planRaw || null
  });
};

export const chatPlan = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const prompt = `
You are a helpful travel assistant.
Answer the user's question conversationally.
Do NOT return JSON — respond in plain text only.

User question:
${message}
`;

    const response = await ollama.chat({
      model: "llama3",
      messages: [{ role: "user", content: prompt }],
    });

    return res.json({
      reply: response.message.content // ✅ plain text reply
    });

  } catch (error) {
    console.error("Chat plan generation failed:", error);
    res.status(500).json({ error: "Failed to generate chat plan" });
  }
};


