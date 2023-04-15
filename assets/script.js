// GIVEN a weather dashboard with form inputs
  // find form on bootstrap
// WHEN I search for a city
  // need to save search history in local storage
// THEN I am presented with current and future conditions for that city and that city is added to the search history
  // connect to weather API
  // need to take search history from local storage and display it on page

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// variable statements
var searchFormEl = $('#search');
var searchBtn = $('#search-btn')
var searchHistoryEl = $('#search-history-container');
var searchHistory;
var city;


// variables
var apiKey = "40b10aa426a06b771a72b081e7b57995";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

// search bar function
$('#search-btn').click(function() {
  var city = $('#search-input').val();
  localStorage.setItem('city', city);

});


// api function
function getApi() {
fetch(queryURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
});
}

