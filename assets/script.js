// WHEN I search for a city
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
var searchInput = $('#search-input')
var searchFormEl = $('#search');
var searchBtn = $('#search-btn')
var searchHistoryEl = $('#search-history-container');
var searchList = $('#search-list');
var cityWeatherEl = $('#city-weather');
var fiveDayForEl = $('#five-day-forecast');

// variables
var apiKey = '0c5f34ee552bf2cf8fb400c1e3120e45';
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
var lon;
var lat;
var latlonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
var historyArray = [];
var city = $('#search-input').val();;

function renderHistory() {
  searchList.text('');
  // for-loop to create new list elements with each search input
  for (var i = 0; i < historyArray.length; i++) {
    var searchHistory = historyArray[i];
    var li = $('<li>');
    li.text(searchHistory);
    searchList.append(li);
  }
}

// store search history in local storage
function storeSearchHistory() {
  localStorage.setItem('city', JSON.stringify(historyArray));
}

// get stored search history from local storage
function init() {
  var storedHistory = JSON.parse(localStorage.getItem('city'));

  if (storedHistory !== null) {
    storedHistory += historyArray;
  }
  storedHistory.push(city);
  renderHistory();
}


// search bar event listener function
$('#search-btn').click(function (event) {
  event.preventDefault();
  var searchText = searchInput.val();
  historyArray.push(searchText);
  searchInput.val('');

  storeSearchHistory();
  renderHistory();
  getCityCoord(searchText);
  getWeatherForecast()
});

// get city coordinates
// AskBCS Learning Assistant helped me pass the city variable into the function and then call the function correctly
function getCityCoord(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lon = data[0].lon;
      var lat = data[0].lat;
      getWeatherForecast(lon, lat);
    })
  }

  // api function
  function getWeatherForecast(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
      })

  }



// function searchApi(query,) {
//   var locQueryUrl = 'https://www.loc.gov/search/?fo=json';

