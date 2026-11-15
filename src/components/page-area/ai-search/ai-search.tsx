import { TripModel } from "../../../models/TripModel";
import { Itinerary } from "../../../models/DayPlan";
import { promptService } from "../../../services/prompt-service"
import { notify } from "../../../utils/notify";
import { Spinner } from "../spinner/spinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./ai-search.css";

export function AiSearch() {

    const { register, handleSubmit } = useForm<TripModel>();
    const [completion, setCompletion] = useState<Itinerary>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function send(trip: TripModel) {
        try {
            setLoading(true);
            const completion = await promptService.getCompletion(trip);
            setCompletion(completion);
        } catch (err: any) {
            notify.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="AiSearch">
            <h1>Generate Your Trip Plan</h1>

            <form onSubmit={handleSubmit(send)}>
                <label>Country</label>
                <input type="text" {...register("country")} required minLength={2} maxLength={50} />

                <label>City</label>
                <input type="text" {...register("city")} required minLength={2} maxLength={50} />

                <label>Days</label>
                <input type="number" {...register("days", { valueAsNumber: true })} required min={2} max={30} />

                <label>Trip Type</label>
                <select {...register("tripType")} required defaultValue="">
                    <option value="" disabled>Choose...</option>
                    <option value="Beach">Beach</option>
                    <option value="City">City</option>
                    <option value="Nature">Nature</option>
                    <option value="Culture">Culture</option>
                </select>

                <button>Search</button>
            </form>
            <hr />

            {loading && <Spinner />}
            {completion.map((dayPlan, index) => (
                <div key={index} className="day-card">
                    <h3>{dayPlan.day}</h3>
                    <p>Morning: {dayPlan.morning}</p>
                    <p>Afternoon: {dayPlan.afternoon}</p>
                    <p>Evening: {dayPlan.evening}</p>
                </div>
            ))}
        </div>
    );
}
