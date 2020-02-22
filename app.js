import Weather from './common/weather-data';
import secret  from'./config/secret';

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function loadingVisibility(value) {
    var loadingText = document.querySelector('#load');
    var weatherBox = document.querySelector('#weather');
    var isVisible = value === 'block';
    
    if(isVisible) {
        hideElement(loadingText);
        showElement(weatherBox);

        return;
    }
    
    showElement(loadingText);
    hideElement(weatherBox);
}

function searchWeather() {
    var searchCity = document.querySelector('#city');
    var cityName = searchCity.value;
    
    loadingVisibility('none');
    
    if (cityName.trim().length == 0) {
        return alert("Please enter a City Name");   
    }
    
    var http = new XMLHttpRequest();
    var apiKey = secret;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';
    http.open(method,url);
    http.onreadystatechange = function(){
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200){
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        }
        else if(http.readyState == XMLHttpRequest.DONE){
            alert("something went wrong")
            
        }
    };
    http.send();
}

var searchButton = document.querySelector('button');
searchButton.addEventListener('click', searchWeather);

function updateWeather(weatherData){
    var weatherCity = document.querySelector('#weatherCity');
    var weatherDescription = document.querySelector('#weatherDescription');
    var weatherTemperature = document.querySelector('#weatherTemperature');
    
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;
    
    loadingVisibility('block');
}