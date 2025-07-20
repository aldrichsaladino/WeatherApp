/* Script for the Weather App. 
    This script will handle the fetching of weather data from an API, 
    processing the data, and displaying it in the HTML.
*/

//Identify the elements in the HTML


// Get Weather Data from API. Asynchronous function to fetch weather data based on user input
async function getWeatherData(location) {
    const api_key = 'R5ZB3BXVZGWU6SLYGV94GL4NS'
    const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&include=current&key=${api_key}`

    // Try is used to catch any errors that may occur during the fetch request
    try {
        const response = await fetch(api_url)
// Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error ('API Error: ');
        }

        //if good response, parse the JSON data from the Visual Crossing API
        const data = await response.json()
        const weatherData = processWeatherData(data)
        console.log(data);
        displayWeatherData(weatherData);

        //If  the error in location, log the error message
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }

// Aka check fetch the data from the api, and then log it in the console. Await is used to wait for the API before logging
}

//get api data from the html form
var form = document.getElementById('locationForm');
var input = document.getElementById('locationInput');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var location = input.value; //var is used since location can be changed or reused

    getWeatherData(location); // Call the function to get weather data
})
// Process Weather Data from Form
function processWeatherData (data){
    //Return specific criteria and data from the API
    return {
        location: data.resolvedAddress,
        temperature: data.currentConditions.temp,
        condition: data.currentConditions.conditions,
        icon: data.currentConditions.icon
    };


}


// Display Weather Data in HTML
function displayWeatherData (weatherData) {
// get the weather element for html
const weatherDisplay = document.getElementById('weatherDisplay');

// Update the inner HTML of the weatherDisplay element with the weather data
weatherDisplay.innerHTML = 
    `<h2>Weather in $(weatherData.location), $(weatherData.region), $(weatherData.country)</h2> +
    <p>Temperature: $(weatherData.temperature)°C</p> +
    <p>Condition: $(weatherData.condition)</p> +
    <img src="$(weatherData.icon)" alt="Weather Icon">`;

}