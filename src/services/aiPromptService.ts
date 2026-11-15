import { RecipeRequestModel } from "../models/RecipeRequestModel";
import { Suggestions } from "../models/SuggestionModel";
import { aiService } from "./aiService";

class AiPromptService{
    public async getCompletion(request:RecipeRequestModel): Promise<Suggestions>{
        const systemPrompt = `You are a master chef in an appointment with a client planning a meal.
Based on the client's available ingredients, number of servings, and cuisine type,
suggest a full meal of exactly 3 dishes: a starter, a main, and a dessert, in that order.
The "instructions" value of each dish must be numbered steps, each step stating the ingredients, amounts, and time needed.
Respond ONLY with valid JSON, no explanations, no markdown code fences, no extra text.
The JSON must be an array of exactly 3 objects, each with this exact shape:
{ "name": "...", "time": "...", "instructions": "..." }`;

        const userPrompt = `I have these ingredients: ${request.ingredients}.
I am cooking for ${request.servings} people and I want ${request.cuisineType} cuisine.
Please suggest a meal as a JSON array of exactly 3 objects (starter, main, dessert in order),
each with keys "name", "time", and "instructions". Return only the JSON array, nothing else.`;


        const completion = await aiService.getCompletion(systemPrompt, userPrompt);
        const sanitized = sanitizeJson(completion);
        const suggestions:Suggestions = JSON.parse(sanitized);
        return suggestions;
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

export const aiPromptService = new AiPromptService();