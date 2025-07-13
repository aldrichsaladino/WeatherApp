/* Script for the Weather App. 
    This script will handle the fetching of weather data from an API, 
    processing the data, and displaying it in the HTML.
*/

//Identify the elements in the HTML


// Get Weather Data from API
function getWeatherData(location) {
    const api_key = ''
    const api_url = ''

    const response = await fetch(api_url)
    const data = await response.json()
    console.log(data);

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
function processWeatherData {


}


// Display Weather Data in HTML
function displayWeatherData {


}