import { WeatherModel } from "../models/WeatherModel";
import axios from "axios";
import { appConfig } from "../utils/app-config";

class WeatherService {
    public async getWeather(city: string): Promise<WeatherModel> {
        const { data } = await axios.get(appConfig.openWeatherUrl, {
            params: { q: city, appid: appConfig.openWeatherKey, units: "metric" }
        });
        console.log(data);
        return {
            cityName: data.name,
            temperature: data.main.temp,
            description:data.weather[0].description,
            icon: data.weather[0].icon,
            lat:data.coord.lat,
            lon:data.coord.lon
        };
    }
}

export const weatherService = new WeatherService();