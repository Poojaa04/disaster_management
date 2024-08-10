const inputbox = document.querySelector('.input-box');
const searchbtn = document.querySelector('#searchbtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const showSearchBtn = document.querySelector('#show-search-btn');
const weatherSearch = document.querySelector('#weather-search');
const error_message = document.createElement('div'); // Create a new div for the error message

error_message.style.color = 'red'; // Set the error message color
error_message.style.marginTop = '10px'; // Add some spacing
weatherSearch.appendChild(error_message); // Append the error message div to the weatherSearch div

showSearchBtn.addEventListener('click', () => {
    weatherSearch.style.display = 'block';
});

async function checkWeather(city) {
    if (city.trim() === "") {
        error_message.innerText = "Please enter a valid city name!";
        location_not_found.style.display = "none";
        weather_body.style.display = "none";
        return;
    }

    const api_key = "2e6239f0acfe196c0702010fccb0a3f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === '404') {
        error_message.innerText = ""; // Clear the error message
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    error_message.innerText = ""; // Clear the error message if the input is valid
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = ` Temperature :${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = ` Humidity : ${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `Wind speed : ${weather_data.wind.speed}km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;
        case 'Clear':
            weather_img.src = "clear.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;
    }
}

searchbtn.addEventListener('click', () => {
    checkWeather(inputbox.value);
});
