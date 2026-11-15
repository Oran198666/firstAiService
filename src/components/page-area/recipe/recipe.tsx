import { RecipeRequestModel } from "../../../models/RecipeRequestModel";
import { Suggestions } from "../../../models/SuggestionModel";
import { recipePromptService } from "../../../services/recipePromptService"
import { notify } from "../../../utils/notify";
import { Spinner } from "../spinner/spinner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./recipe.css";

export function Recipe() {
    const { register, handleSubmit } = useForm<RecipeRequestModel>();
    const [suggestions, setSuggestions] = useState<Suggestions>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000);
        return (() => clearInterval(timer))
    }, [])

    async function send(request: RecipeRequestModel) {
        try {
            setLoading(true);
            const suggestions = await recipePromptService.getCompletion(request);
            setSuggestions(suggestions);
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="RecipeSearch">
            <h1>Plan Your Meal</h1>
            <form onSubmit={handleSubmit(send)}>
                <label>Ingredients</label>
                <input type="text" {...register("ingredients")} required minLength={3} maxLength={200} />

                <label>Servings</label>
                <input type="number" {...register("servings", { valueAsNumber: true })} required min={1} max={20} />

                <label>Cuisine</label>
                <select {...register("cuisineType")} required defaultValue="">
                    <option value="" disabled>Choose...</option>
                    <option value="Italian">Italian</option>
                    <option value="Asian">Asian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="French">French</option>
                </select>

                <button>Suggest</button>
            </form>
            <hr />

            {loading && <Spinner />}
            {suggestions.map((dish, index) => (
                <div key={index} className="dish-card">
                    <h3>{dish.name}</h3>
                    <p>Time: {dish.time}</p>
                    <p>{dish.instructions}</p>
                    <div>
                        <p>{time.toLocaleTimeString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}