// variable expressions
var searchInput = document.getElementById('search-input')
var searchFormEl = document.getElementById('search');
var searchBtn = document.getElementById('search-btn')
var searchHistoryEl = document.getElementById('search-history-container');
var searchList = document.getElementById('search-list');
var cityWeatherEl = document.getElementById('city-weather');
var fiveDayForEl = document.getElementById('five-day-forecast');
var cityNameEl = document.getElementById('city-name');

// variables
var apiKey = '40b10aa426a06b771a72b081e7b57995';
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
var lon;
var lat;
var latlonURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
var historyArray = [];
var city = document.getElementById('search-input').value;

function renderHistory() {
  searchList.textContent = ('');
  // for-loop to create new list elements with each search input
  for (var i = 0; i < historyArray.length; i++) {
    var searchHistory = historyArray[i];
    var button = document.createElement('button');
    button.textContent = searchHistory;
    searchList.appendChild(button);
    button.addEventListener('click', function() {
      getCityCoord(this.textContent);
    })
  }
}

// get stored search history from local storage
function init() {
  var storedHistory = JSON.parse(localStorage.getItem('city'));

  if (storedHistory !== null) {
   historyArray = storedHistory;
  }
  renderHistory();
}

// store search history in local storage
function storeSearchHistory() {
  localStorage.setItem('city', JSON.stringify(historyArray));
}

// search bar event listener function
searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  var searchText = searchInput.value;
  if (searchText === "") {
    return;
  }

  historyArray.push(searchText);
  searchInput.value = '';

  storeSearchHistory();
  renderHistory();
  getCityCoord(searchText);

});

// get city coordinates
// AskBCS Learning Assistant helped me pass the city variable into the function and then call the function correctly
function getCityCoord(city) {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lon = data[0].lon;
      var lat = data[0].lat;
      getWeatherForecast(lon, lat);
      cityName = city;
    })
}


// api function
function getWeatherForecast(lon, lat) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityDisplay = document.querySelector('#city-name')
      cityDisplay.textContent = data.city.name;
      // appending specific city information onto web page. Need index at 0, 8, 15, 23, 31, and 39 to get 6 days of weather
      var days = [0, 8, 15, 23, 31, 39];
      for (let i = 0; i < days.length; i++) {
        // Patrick Lake (bootcamp tutor) helped me with the day- + i iteration
        var dayCardEl = document.getElementById('day-' + i);
        var weatherData = data.list[days[i]];

        // iterating the date
        var firstDay = dayjs();
        var dateDisplay = dayCardEl.querySelector('.date');
        dateDisplay.style.fontWeight = "900";
        dateDisplay.textContent = firstDay.add(i, 'day').format('MM/DD/YYYY');

        // iterating the icon
        var icon = weatherData.weather[0].icon
        var iconDisplay = dayCardEl.querySelector('.icon');
        // Jessica Saddington directed me to the link where the weather icons were stored
        iconDisplay.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

        // iterating the temperature
        var tempDisplay = dayCardEl.querySelector('.temp');
        // found degree symbol from GirlDevelopItChicago
        tempDisplay.textContent = 'Temp: ' + weatherData.main.temp + '\u00B0' + 'F';

        // iterating the humidity
        var humidityDisplay = dayCardEl.querySelector('.humidity');
        humidityDisplay.textContent = 'Humidity: ' + weatherData.main.humidity + '%';

        // iterating the wind speed
        var windDisplay = dayCardEl.querySelector('.wind');
        windDisplay.textContent = 'Wind speed: ' + weatherData.wind.speed + 'mph';
      }
    })
}

// renders the local storage data on page load
init()
