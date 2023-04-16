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
var searchInput = $('#search-input')
var searchFormEl = $('#search');
var searchBtn = $('#search-btn')
var searchHistoryEl = $('#search-history-container');
var searchList = $('#search-list');
var historyArray = [];
var city;


// variables
var apiKey = "40b10aa426a06b771a72b081e7b57995";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


function renderHistory() {
  searchList.text('');
  city = $('#search-input').val();
  // var searchHistory = historyArray[i];
  localStorage.setItem('city', JSON.stringify(historyArray));
  // for-loop to create new list elements with each search input
  for (var i = 0; i < historyArray.length; i++) {
    var searchHistory = historyArray[i];
    var li = $('<li>');
    li.text(searchHistory);
    li.attr('history-index', i);
    searchList.append(li)
  }
}

// get stored search history from local storage
function init() {
  var storedHistory = JSON.parse(localStorage.getItem('city'));
  storedHistory.push(city);
  // localStorage.setItem('city', JSON.stringify(historyArray));
  renderHistory();
}

// search bar event listener function
$('#search-btn').click(function(event) {
  event.preventDefault();
  // city = $('#search-input').val();
  var searchText = searchInput.val();
  historyArray.push(searchText);
  searchInput.value = '';

  renderHistory();
});

// api function
function getApi() {
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
    });
}


// function searchApi(query,) {
//   var locQueryUrl = 'https://www.loc.gov/search/?fo=json';

// fetchButton.addEventListener('click', getApi);