/* Script for the Weather App. 
    This script will handle the fetching of weather data from an API, 
    processing the data, and displaying it in the HTML.
*/

//Identify the elements in the HTML
    const api_key = 'R5ZB3BXVZGWU6SLYGV94GL4NS'

    var form = document.getElementById('locationForm');
    var input = document.getElementById('locationInput');

// Get Weather Data from API. Asynchronous function to fetch weather data based on user input. this API will collect both current weather and th
async function getWeatherData(location) {
    const encodedLocation = encodeURIComponent(location.trim());
    const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=metric&key=${api_key}&contentType=json`;


    // Debug logs
    console.log(`Original location input: "${location}"`);
    console.log(`Encoded location: "${encodedLocation}"`);
    console.log(`Full API URL: ${api_url}`);
    // Try is used to catch any errors that may occur during the fetch request
    try {
        const response = await fetch(api_url)
// Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error ('API Error: ');
        }

        //if good response, parse the JSON data from the Visual Crossing API
        const data = await response.json()

        console.log(data);

        const todayWeather = processWeatherData(data);
        displayWeatherData(todayWeather);

        const forecast = processForecastData(data);           
        displayForecastData(forecast);

        const hourly = processHourlyForecast(data);             
        displayHourlyForecast(hourly);                          

        const extra = processExtraData(data);
        displayExtraData(extra);

        updateRadarMap(data.latitude, data.longitude); // Pass actual coords
        setBackgroundImage(location);                           

        //If  the error in location, log the error message
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Process Weather Data from Form
function processWeatherData (data){
    //Return specific criteria and data from the API
    console.log(data);
    return {
        location: data.resolvedAddress,
        temperature: data.currentConditions.temp,
        condition: data.currentConditions.conditions,
        icon: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.currentConditions.icon}.png`,

        //Addditional data for today's weather
        tempMax: data.days[0].tempmax,
        tempMin: data.days[0].tempmin
    };
}

// Process Forecast Data for 7 Day Forecast
function processForecastData(data) {
    //use slice to get only the first 7 days aka 0-7
    console.log('Forecast days returned:', data.days.length); // Check total from API
    const sliced = data.days.slice(0, 7);
    console.log('Sliced forecast (should be 7):', sliced.length);
    return sliced.map(day => ({
        date: day.datetime,
        condition: day.conditions,
        high: day.tempmax,
        low: day.tempmin,
        precipProb: day.precipprob,
        // Use the icon from the day object, formatted to match the URL structure
        icon: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png`
}));

    // Return specific criteria and data from the API
    //map through days in data since they're the same structure. We add them into an array using the map function
}

// Process Extra Data for Additional Information
function processExtraData(data) {
    return {
        windSpeed: data.currentConditions.windspeed,
        humidity: data.currentConditions.humidity,
        pressure: data.currentConditions.pressure,
        visibility: data.currentConditions.visibility,
        precipProb: data.currentConditions.precipprob
    }
}

function processHourlyForecast(data) {                   
  return data.days[0].hours.slice(0, 12).map(hour => ({
    time: hour.datetime,
    temp: hour.temp,
    feelslike: hour.feelslike,
    precip: hour.precipprob,
    icon: `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${hour.icon}.png`
  }));
}


//Display Data
// Display Weather Data in HTML
function displayWeatherData(weatherData) {
    const weatherDisplay = document.getElementById('weatherDisplay');

    weatherDisplay.innerHTML = `
        <h2>Today's Weather in ${weatherData.location}</h2>
        <div class="temp">${weatherData.temperature}°C</div>
        <p>${weatherData.condition}</p>
        <p>High: ${weatherData.tempMax}°C | Low: ${weatherData.tempMin}°C</p>
        <img src="${weatherData.icon}" alt="Weather Icon">
    `;
}


//add another function to display the 7 day forecast data in the HTML
function displayForecastData(forecastData) {
    const forecastDisplay = document.getElementById('forecastDisplay');
    forecastDisplay.innerHTML = ''; // Clear previous forecast data

    forecastData.forEach(day => {
        forecastDisplay.innerHTML += `
            <div class="forecast-day">
                <h3>${day.date}</h3>
                <img src="${day.icon}" alt="Weather Icon">
                <p><strong>Condition: ${day.condition}</strong></p>
                <p>High: ${day.high}°C</p>
                <p>Low: ${day.low}°C</p>
                <p>Precipitation: ${day.precipProb}%</p>

            </div>
        `;
    });
}

// Display the Extra Data ( change to something else later)
function displayExtraData(extraData) {
    const extraDisplay = document.getElementById('extraDisplay');
    extraDisplay.innerHTML = `
        <h2>Additional Information</h2>

        <div class="info-item">
            <img src="https://cdn-icons-png.flaticon.com/512/481/481106.png" alt="Wind Icon" />
            <p><strong>Wind Speed:</strong> ${extraData.windSpeed} km/h</p>
        </div>

        <div class="info-item">
            <img src="https://cdn-icons-png.flaticon.com/512/728/728093.png" alt="Humidity Icon">
            <p><strong>Humidity:</strong> ${extraData.humidity}%</p>
        </div>

        <div class="info-item">
            <img src="https://cdn-icons-png.flaticon.com/512/777/777759.png" alt="Pressure Icon">
            <p><strong>Pressure:</strong> ${extraData.pressure} hPa</p>
        </div>

        <div class="info-item">
            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922730.png" alt="Visibility Icon">
            <p><strong>Visibility:</strong> ${extraData.visibility} km</p>
        </div>

        <div class="info-item">
            <img src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png" alt="Precipitation Icon">
            <p><strong>Precipitation Chance:</strong> ${extraData.precipProb}%</p>
        </div>
    `;
}

function displayHourlyForecast(hourlyData) {                
  const hourlyDisplay = document.getElementById('hourlyForecastDisplay');
  hourlyDisplay.innerHTML = '';

  hourlyData.forEach(hour => {
    hourlyDisplay.innerHTML += `
      <div class="hour-card">
        <h4>${hour.time}</h4>
        <img src="${hour.icon}" alt="Icon">
        <p>${hour.temp}°C (Feels like ${hour.feelslike}°C)</p>
        <p>Precipitation: ${hour.precip}%</p>
      </div>
    `;
  });
}

function updateRadarMap(lat, lon) {                       
    const radarFrame = document.getElementById('radarMap'); // Match your iframe ID
    radarFrame.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&zoom=6&level=surface&overlay=radar&product=ecmwf`;
}


function setBackgroundImage(location) {
  const fallbackImage = "https://images.unsplash.com/photo-1580193483760-d0ef2abaa348?auto=format&fit=crop&w=1600&q=80";

  const img = new Image();
  img.onload = () => {
    document.body.style.backgroundImage = `url('${fallbackImage}')`;
  };
  img.onerror = () => {
    console.warn("Image failed to load.");
    document.body.style.backgroundImage = "#333"; // fallback background
  };
  img.src = fallbackImage;
}






//Form Submission Event Listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var location = input.value; //var is used since location can be changed or reused

    if(location) {
        getWeatherData(location); // Call the function to get weather data
    } else {
        alert('Please enter a location'); // Alert if no location is entered
        return;
    }
    console.log(`Fetching weather data for: ${location}`);
})


//Have a default location to display weather data when the page loads
window.addEventListener('DOMContentLoaded', function() {
    const defaultLocation = 'Calgary, Canada'; // Default location

    input.value = defaultLocation; // Set the input value to the default location
    setBackgroundImage(defaultLocation); // e.g. "Calgary"
    getWeatherData(defaultLocation); // Fetch weather data for the default location
});
