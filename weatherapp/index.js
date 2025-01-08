const CONFIG = {
    //put your API key here
    API_KEY: "23a09e2def440ac6c6a1065fc0a749bf",
    API_BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
    DEFAULT_UNITS: "metric"
};

class WeatherApp {
    constructor() {
        this.isCelsius = true;
        this.initializeElements();
        this.attachEventListeners();
        this.loadFavorites();
    }

    initializeElements() {
        this.elements = {
            getLocationBtn: document.getElementById("get-location"),
            fetchWeatherBtn: document.getElementById("fetch-weather"),
            cityInput: document.getElementById("city-input"),
            weatherInfo: document.getElementById("weather-info"),
            cityNameElem: document.getElementById("city-name"),
            tempElem: document.getElementById("temperature"),
            conditionElem: document.getElementById("condition"),
            recommendationElem: document.getElementById("recommendation"),
            unitToggle: document.getElementById("unit-toggle"),
            favoritesList: document.getElementById("favorites-list")
        };
    }

    attachEventListeners() {
        this.elements.getLocationBtn.addEventListener("click", () => this.handleGetLocation());
        this.elements.fetchWeatherBtn.addEventListener("click", () => this.handleFetchWeather());
        this.elements.unitToggle.addEventListener("click", () => this.handleUnitToggle());
        this.elements.cityInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.handleFetchWeather();
        });
    }

    async handleGetLocation() {
        try {
            if (!navigator.geolocation) {
                throw new Error("Geolocation is not supported by this browser.");
            }

            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position.coords;
            const data = await this.fetchWeatherByCoords(latitude, longitude);
            this.displayWeather(data);
        } catch (error) {
            this.showError(error);
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async handleFetchWeather() {
        const city = this.elements.cityInput.value.trim();
        if (!city) {
            this.showError(new Error("Please enter a city name."));
            return;
        }

        try {
            const data = await this.fetchWeatherByCity(city);
            if (data) {
                this.addCityToFavorites(city);
                this.displayWeather(data);
            }
        } catch (error) {
            this.showError(error);
        }
    }

    async fetchWeatherByCoords(lat, lon) {
        const url = new URL(CONFIG.API_BASE_URL);
        url.searchParams.append("lat", lat);
        url.searchParams.append("lon", lon);
        url.searchParams.append("units", this.isCelsius ? "metric" : "imperial");
        url.searchParams.append("appid", CONFIG.API_KEY);
        
        return this.fetchWeather(url);
    }

    async fetchWeatherByCity(city) {
        const url = new URL(CONFIG.API_BASE_URL);
        url.searchParams.append("q", city);
        url.searchParams.append("units", this.isCelsius ? "metric" : "imperial");
        url.searchParams.append("appid", CONFIG.API_KEY);
        
        return this.fetchWeather(url);
    }

    async fetchWeather(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Weather data not found (${response.status})`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }

    displayWeather(data) {
        if (!data?.main) return;

        this.elements.weatherInfo.hidden = false;
        this.elements.cityNameElem.textContent = data.name;
        this.elements.tempElem.textContent = `${Math.round(data.main.temp)}°${this.isCelsius ? "C" : "F"}`;
        this.elements.conditionElem.textContent = data.weather[0].description;
        this.elements.recommendationElem.textContent = this.getRecommendation(
            data.main.temp,
            data.weather[0].main
        );
        
        this.updateBackground(data.weather[0].main);
    }

    getRecommendation(temp, condition) {
        const recommendations = {
            rain: "Carry an umbrella!",
            cold: "Wear a heavy jacket.",
            hot: "Stay hydrated!",
            default: "Perfect day for a walk!"
        };

        if (condition.toLowerCase().includes("rain")) return recommendations.rain;
        if (temp < (this.isCelsius ? 10 : 50)) return recommendations.cold;
        if (temp > (this.isCelsius ? 25 : 77)) return recommendations.hot;
        return recommendations.default;
    }

    updateBackground(condition) {
        const colors = {
            rain: "#a3c7d6",
            clouds: "#d3d3d3",
            default: "#f7dc6f"
        };

        const condition_lower = condition.toLowerCase();
        document.body.style.backgroundColor = 
            condition_lower.includes("rain") ? colors.rain :
            condition_lower.includes("cloud") ? colors.clouds :
            colors.default;
    }

    handleUnitToggle() {
        this.isCelsius = !this.isCelsius;
        this.elements.unitToggle.textContent = `Switch to ${this.isCelsius ? "°F" : "°C"}`;
        
        const cityName = this.elements.cityNameElem.textContent;
        if (cityName) {
            this.fetchWeatherByCity(cityName).then(data => this.displayWeather(data));
        }
    }

    addCityToFavorites(city) {
        const existingCity = Array.from(this.elements.favoritesList.children)
            .find(li => li.textContent === city);
        
        if (existingCity) return;

        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            this.fetchWeatherByCity(city).then(data => this.displayWeather(data));
        });
        
        this.elements.favoritesList.appendChild(li);
        this.saveFavorites();
    }

    saveFavorites() {
        const cities = Array.from(this.elements.favoritesList.children)
            .map(li => li.textContent);
        localStorage.setItem("favoriteCities", JSON.stringify(cities));
    }

    loadFavorites() {
        const cities = JSON.parse(localStorage.getItem("favoriteCities") || "[]");
        cities.forEach(city => this.addCityToFavorites(city));
    }

    showError(error) {
        console.error(error);
        alert(error.message);
    }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    new WeatherApp();
});