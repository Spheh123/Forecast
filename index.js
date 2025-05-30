function displayTemperature(response) {
  // Update city name
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  // Update temperature
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  // Update weather description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  // Update humidity (with %)
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  // Update wind speed (with km/h)
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  // Update time (browser's local time)
  let timeElement = document.querySelector("#time");
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[now.getDay()];

  timeElement.innerHTML = `${dayName} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

// Initialize with default city
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Johannesburg");
