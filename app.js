var $humidity = document.getElementById('js-humidity');
var $windspeed = document.getElementById('js-windspeed');
var $pressure = document.getElementById('js-pressure');
var $temp = document.getElementById('js-temperature');
var $summary = document.getElementById('js-summary');
var $nextDayBtn = document.getElementById('js-next');
var $prevDayBtn = document.getElementById('js-prev');
var $day = document.getElementById('js-displayed-day');
var requstedDate = Date.now() / 1000; //current Unix time in SECONDS

function getWeather() {
    const xhr = new XMLHttpRequest();
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    
    xhr.open('GET', proxy + 'https://api.darksky.net/forecast/866e53841c0924f3cd6ac3dcbc4b16dd/49.834612,24.040734?units=auto', true);
    //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            //console.log(response);
            $humidity.innerHTML = response.currently.humidity;
            $windspeed.innerText = `${response.currently.windSpeed} km/h`;
            $pressure.innerText = response.currently.pressure;
            $temp.innerHTML = `${Math.floor(response.currently.apparentTemperature)}&deg;`;
            $summary.innerText = response.currently.summary;
        }
    }
    xhr.onerror = function() {
        console.log('Something bad happened');
    }
    xhr.send();
}

function getPlaceName() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=49.834612,24.040734&language=en&key=AIzaSyDS7eOa84dKPzV0CCvBCcMX2S3xeLMQs0o')
    .then(function(response) { //one way to parse readableStream obj
        return response.json();
    })
    .then(function(data) {
        //console.log(data)
        document.getElementById('js-place').innerHTML = data.results[4].address_components[1].short_name;
        return data;
    }).catch(function(error) {
        console.log('Error: ' + error);
    });
}

function getPrevDayWeather() {
    requstedDate = Math.floor(requstedDate - 24 * 60 * 60);
    //console.log(requstedDate);
    var xhr = new XMLHttpRequest();
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    xhr.open('GET', proxy + `https://api.darksky.net/forecast/866e53841c0924f3cd6ac3dcbc4b16dd/49.834612,24.040734,${requstedDate}?&units=auto`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            //console.log(response);
            $humidity.innerHTML = response.currently.humidity;
            $windspeed.innerText = `${response.currently.windSpeed} km/h`;
            $pressure.innerText = response.currently.pressure;
            $temp.innerHTML = `${Math.floor(response.currently.apparentTemperature)}&deg;`;
            $summary.innerText = response.currently.summary;
            updateTime();
        }
    }
    xhr.onerror = function() {
        console.log('Something bad happened');
    }
    xhr.send();
}

function getNextDayWeather() {
    requstedDate = Math.floor(requstedDate + 24 * 60 * 60); //represents 24 hours in Unix Time
    //console.log(requstedDate);
    var xhr = new XMLHttpRequest();
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    xhr.open('GET', proxy + `https://api.darksky.net/forecast/866e53841c0924f3cd6ac3dcbc4b16dd/49.834612,24.040734,${requstedDate}?&units=auto`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            //console.log(response);
            $humidity.innerHTML = response.currently.humidity;
            $windspeed.innerText = `${response.currently.windSpeed} km/h`;
            $pressure.innerText = response.currently.pressure;
            $temp.innerHTML = `${Math.floor(response.currently.apparentTemperature)}&deg;`;
            $summary.innerText = response.currently.summary;
            updateTime();
        }
    }
    xhr.onerror = function() {
        console.log('Something bad happened');
    }
    xhr.send();
}

function updateTime() {
    var shownDate = new Date(requstedDate * 1000);
    document.getElementById('js-date').innerHTML = `${shownDate.getDate()} / ${shownDate.getMonth()+1} / ${shownDate.getFullYear()}`;
}

getPlaceName();

getWeather();

var currentDate = new Date();
document.getElementById('js-date').innerHTML = `${currentDate.getDate()} / ${currentDate.getMonth()+1} / ${currentDate.getFullYear()}`;

$nextDayBtn.addEventListener('click', getNextDayWeather);
$prevDayBtn.addEventListener('click', getPrevDayWeather);

