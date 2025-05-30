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

  // Update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  // Update wind speed (convert m/s to km/h)
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  // Update time
  let timeElement = document.querySelector("#time");
  let now = new Date(response.data.time * 1000);
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
  let day = days[now.getDay()];
  timeElement.innerHTML = `${day} ${hours}:${minutes}`;

  // Update weather icon (replaces the emoji)
  let iconElement = document.querySelector(".weather-app-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" width="64">`;
}

function searchCity(city) {
  let apiKey = "34a94d7b8cafc001064ocd5a14ctbaf4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Show loading state
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "...";

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("City not found. Please try another location.");
      temperatureElement.innerHTML = "---";
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  if (searchInput.value.trim().length > 0) {
    searchCity(searchInput.value);
  }
}

// Initialize with default city
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Johannesburg");
