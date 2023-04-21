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
var cityNameEl = document.getElementById('city-name');


// variables
var apiKey = '40b10aa426a06b771a72b081e7b57995';
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
var lon;
var lat;
var latlonURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
var historyArray = [];
var city = $('#search-input').val();

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
      // call one city function here
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

      var days = [0, 8, 15, 23, 31, 39];
      for (let i = 0; i < days.length; i++) {
        var dayCardEl = document.getElementById('day-' + i);
        var dateDisplay = dayCardEl.querySelector('.date');
        var dateData = data.list[days[i]];
        console.log(dateData)
        dateDisplay.textContent = 'card' + i;
        // var dateTempEl = document.getElementsByClassName('temp');

        // // cityName = data[city];
        // dateTemp = data.list[days[i]].main.temp;
        // console.log(data.list[days[i]].main.temp);
        // var dateWind = data.list[days[i]].wind.speed
        // var datetHumidity = data.list[days[i]].main.humidity
        // var dateDate = data.list[days[i]].dt_txt

        // // var dateDateEl = $()
        
        // $('#city-name').text(cityName + dayjs().format('MM/DD/YYYY'));
        // dateTempEl.textContent = 'Temp: ' + dateTemp + '\u00B0';
        // $('.wind').text('Wind: ' + dateWind + 'mph');
        // $('.humidity').text('Humidity: ' + datetHumidity + '%')
        // $('.date').text(dayjs().format('MM/DD/YYYY'));
      }
    })

}

// appending specific city information onto web page. Need index at 0, 8, 15, 23, 31, and 39

      // var dateTemp = data.list[days[i]].main.temp;
      // var dateWind = data.list[days[i]].wind.speed;
      // var datetHumidity = data.list[days[i]].main.humidity;
      // var dateDate = data.list[days[i]].dt_txt;

      // Day 1

      // var dayOneTempEl = document.getElementsByClassName('day-one-temp');
      // var dayOneWindEl = document.getElementsByClassName('day-one-wind');
      // var dayOneHumidityEl = document.getElementsByClassName('day-one-humidity');
      // // const dateOne = document.getElementsByClassName('day-one-date');

      // dayOneTempEl.textContent = 'Temp: ' + data.list[0].main.temp + '\u00B0' + 'F';
      // dayOneWindEl.textContent = 'Wind:' + data.list[0].wind.speed + 'mph';
      // dayOneHumidityEl.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
      // // dateOne.textContent = (dayjs().format('MM/DD/YYYY'));

      // // Day 2

      // var dayTwoTempEl = document.getElementsByClassName('day-two-temp');
      // var dayTwoWindEl = document.getElementsByClassName('day-two-wind');
      // var dayTwoHumidityEl = document.getElementsByClassName('day-two-humidity');
      // const dayTwoEl = document.getElementsByClassName('day-two-date');

      // dayTwoTempEl.textContent = 'Temp: ' + data.list[8].main.temp + '\u00B0' + 'F';
      // dayTwoWindEl.textContent = 'Wind:' + data.list[8].wind.speed + 'mph';
      // dayTwoHumidityEl.textContent = 'Humidity: ' + data.list[8].main.humidity + '%';
      // // dayTwoEl.textContent = dateOne.add(1, 'day');

      // // Day 3

      // var dayThreeTempEl = document.getElementsByClassName('day-three-temp');
      // var dayThreeWindEl = document.getElementsByClassName('day-three-wind');
      // var dayThreeHumidityEl = document.getElementsByClassName('day-three-humidity');
      // var dayThreeEl = document.getElementsByClassName('day-three-date');

      // dayThreeTempEl.textContent = 'Temp: ' + data.list[15].main.temp + '\u00B0' + 'F';
      // dayThreeWindEl.textContent = 'Wind:' + data.list[15].wind.speed + 'mph';
      // dayThreeHumidityEl.textContent = 'Humidity: ' + data.list[15].main.humidity + '%';
