import { Itinerary } from "../models/DayPlan";
import { TripModel } from "../models/TripModel";
import { gptService } from "./gptService";

class PromptService {
    public async getCompletion(trip: TripModel): Promise<Itinerary> {
        const systemPrompt = `You are an expert travel planner in an appointment with a client planning a vacation.
Based on the client's destination country, city, number of days, and trip type,
provide a day-by-day itinerary. Activities may span multiple cities in the destination country if the number of days allows it.
Each value must start with the country and city, then the time, then the activity.
Respond ONLY with valid JSON, no explanations, no markdown code fences, no extra text.
The JSON must be an array of exactly ${trip.days} objects, each with this exact shape:
{ "day": "Day 1", "morning": "Spain Madrid 10:00 Prado Museum", "afternoon": "Spain Madrid 13:00 football game", "evening": "Spain Madrid 19:00 dinner" }`;

        const userPrompt = `I am planning a ${trip.tripType} trip to ${trip.city}, ${trip.country}, for ${trip.days} days.
Please generate an itinerary for exactly ${trip.days} days as a JSON array of objects,
each with keys "day", "morning", "afternoon", and "evening".
Each value must start with the country and city, then the time, then the activity.
Return only the JSON array, nothing else.`;

        const completion = await gptService.getCompletion(systemPrompt, userPrompt);
        const sanitized = sanitizeJson(completion);
        const tripPlan: Itinerary = JSON.parse(sanitized);
        return tripPlan;
    }
}

function sanitizeJson(raw: string): string {
    return raw
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();
}

export const promptService = new PromptService();