# Weather Tracker

Weather Tracker is a simple and interactive web application that allows users to fetch weather information for their current location or any city around the world. Users can also save their favorite cities and toggle between Celsius and Fahrenheit units.

## Features

- **Fetch Weather by Current Location:** Get the weather information for your current geolocation.
- **Fetch Weather by City Name:** Enter the name of a city to retrieve its weather details.
- **Unit Toggle:** Switch between Celsius and Fahrenheit for temperature display.
- **Favorite Cities:** Save cities to your favorites and quickly access their weather.
- **Dynamic Backgrounds:** Background color changes based on weather conditions (e.g., rain, clouds, clear sky).
- **Recommendations:** Get recommendations based on the weather, such as carrying an umbrella or staying hydrated.
- **Responsive Design:** Works seamlessly across different devices.

## Technologies Used

- **HTML:** For the structure of the web application.
- **CSS:** For styling the UI.
- **JavaScript:** For dynamic behavior, including fetching data from the weather API.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-tracker
   ```

3. Open `index.html` in your browser to run the app locally.

## Usage

1. **Get Weather by Location:**
   - Click the **Get My Location** button to fetch weather data for your current geolocation.

2. **Get Weather by City Name:**
   - Enter a city name in the input field and click the **Get Weather** button.

3. **Toggle Units:**
   - Use the **Switch to °F** button to toggle between Celsius and Fahrenheit.

4. **Add to Favorites:**
   - When you fetch weather for a city, it is added to your favorites. Click a city in the favorites list to fetch its weather quickly.

## API Used

The app uses the [OpenWeather API](https://openweathermap.org/api) to fetch weather data. Replace the `API_KEY` in the `index.js` file with your own API key:

```javascript
const API_KEY = "your-api-key-here";
```

## Project Structure

```
weather-tracker/
├── index.html         # HTML structure of the app
├── styles.css         # CSS for styling
├── index.js           # JavaScript for dynamic behavior
└── README.md          # Project documentation
```
Feel free to contribute to this project by submitting issues or pull requests. Happy coding! :rocket:
