class AppConfig {
    public readonly ApiAiUrl = "https://api.openai.com/v1/chat/completions";
    public readonly ApiAiModel = "gpt-4o-mini";
    public readonly ApiAiKey = import.meta.env.VITE_OPENAI_API_KEY;

    public readonly openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    public readonly openWeatherKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    public readonly EmployeesUrl = "https://jsonplaceholder.typicode.com/users";
}

export const appConfig = new AppConfig();
