/* Script for the Weather App. 
    This script will handle the fetching of weather data from an API, 
    processing the data, and displaying it in the HTML.
*/

//Identify the elements in the HTML


// Get Weather Data from API
function getWeatherData(location) {
    const api_key = ''
    const api_url = ''

    // Try is used to catch any errors that may occur during the fetch request
    try {
        const response = await fetch(api_url)
        const data = await response.json()
        const weatherData - processWeatherData(data)
        console.log(data);
        displayWeatherData(weatherData);
    }

// Aka check fetch the data from the api, and then log it in the console. Await is used to wait for the API before logging
}

//get api data from the html form
var form = document.getElementById('locationForm');
var input = document.getElementById('locationInput');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var location = input.value;

    getWeatherData(location); // Call the function to get weather data
})
// Process Weather Data from Form
function processWeatherData (data){
    //Return specific criteria and data from the API
    return {
        location: data.location.name,
        region: data.location.region,
        country: data.location.country,
        temperature: data.current.temperature,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
    };


}


// Display Weather Data in HTML
function displayWeatherData {


}