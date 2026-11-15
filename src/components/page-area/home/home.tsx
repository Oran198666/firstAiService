import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./home.css";
import { weatherService } from "../../../services/weather-service";
import { WeatherModel } from "../../../models/WeatherModel";
import { Spinner } from "../../page-area/spinner/spinner";
import { notify } from "../../../utils/notify";

export function Home() {
    const [loading, setLoading] = useState<boolean>(false);
    const [weather, setWeather] = useState<WeatherModel | null>(null);
    const [time, setTime] = useState(new Date());
    const { register, handleSubmit } = useForm<{ city: string }>();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    async function send(data: { city: string }) {
        setLoading(true)
        try {
            const weather = await weatherService.getWeather(data.city)
            setWeather(weather)
        } catch (err: any) {
            notify.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="Home">
            <form onSubmit={handleSubmit(send)}>
                <label>City</label>
                <input type="text" {...register("city")} required />
                <button>Search</button>
            </form>

            {loading && <Spinner />}
            {weather && <div>
                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
                <h1>{weather.cityName}</h1>
                <p>Temperature: {weather.temperature} °C</p>
                <p>Description: {weather.description}</p>
                <p>Latitude: {weather.lat}</p>
                <p>Longitude: {weather.lon}</p>
            </div>}
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
}
