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
     const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${api_key}`;

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

        const extra = processExtraData(data);
        displayExtraData(extra);       

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
    return data.days.map(day => ({
        date: day.datetime,
        condition: day.conditions,
        high: day.tempmax,
        low: day.tempmin,
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
    }
}


//Display Data
// Display Weather Data in HTML
function displayWeatherData (weatherData) {
    const weatherDisplay = document.getElementById('weatherDisplay');

// Update the inner HTML of the weatherDisplay element with the weather data
    weatherDisplay.innerHTML = `
        <h2>Today's Weather in ${weatherData.location}</h2>
        <p>Condition: ${weatherData.condition}</p>
        <p>Temperature: ${weatherData.temperature}°C</p>
        <P>Today's High: ${weatherData.tempMax}°C</P>
        <P>Today's Low: ${weatherData.tempMin}°C</P>
        <img src="${weatherData.icon}" alt="Weather Icon">
    `;
};

//add another function to display the 7 day forecast data in the HTML
function displayForecastData(forecastData) {
    const forecastDisplay = document.getElementById('forecastDisplay');
    forecastDisplay.innerHTML = '<h2>7-Day Forecast</h2>';

    forecastData.forEach(day => {
        forecastDisplay.innerHTML += `
            <div class="forecast-day">
                <h3>${day.date}</h3>
                <p>Condition: ${day.condition}</p>
                <p>High: ${day.high}°C</p>
                <p>Low: ${day.low}°C</p>
                <img src="${day.icon}" alt="Weather Icon">
            </div>
        `;
    });
}

// Display the Extra Data ( change to something else later)
function displayExtraData(extraData) {
    const extraDisplay = document.getElementById('extraDisplay');
    extraDisplay.innerHTML = `
        <h2>Additional Information</h2>
        <p>Wind Speed: ${extraData.windSpeed} km/h</p>
        <p>Humidity: ${extraData.humidity}%</p>
        <p>Pressure: ${extraData.pressure} hPa</p>
        <p>Visibility: ${extraData.visibility} km</p>
    `;
};

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
})