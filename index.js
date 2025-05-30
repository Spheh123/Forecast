function displayTemperature(response) {
  // Update basic weather data
  document.querySelector("#city").innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );

  // Update time and date
  let now = new Date(response.data.time * 1000);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.querySelector("#time").innerHTML = `${
    days[now.getDay()]
  } ${hours}:${minutes}`;

  // Update weather icon
  document.querySelector(
    ".weather-app-icon"
  ).innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" width="64">`;

  // Set dynamic background
  updateBackground(response.data.condition.icon, hours, temperature);
}

function updateBackground(iconCode, currentHour, temperature) {
  const body = document.body;
  body.className = ""; // Reset classes

  // Day/night mode
  const isDayTime = currentHour > 6 && currentHour < 20;
  body.classList.add(isDayTime ? "day" : "night");

  // Weather conditions
  if (iconCode.includes("rain")) {
    body.classList.add("rainy");
  } else if (iconCode.includes("snow")) {
    body.classList.add("snowy");
  } else if (iconCode.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (iconCode.includes("clear") || temperature > 30) {
    body.classList.add("sunny");
  } else if (iconCode.includes("wind")) {
    body.classList.add("windy");
  }
}

function searchCity(city) {
  let apiKey = "34a94d7b8cafc001064ocd5a14ctbaf4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Loading state
  document.querySelector("#temperature").innerHTML = "...";

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => {
      console.error("Error:", error);
      alert("City not found. Please try again.");
      document.querySelector("#temperature").innerHTML = "---";
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  if (searchInput.value.trim()) {
    searchCity(searchInput.value);
  }
}

// Initialize
document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);
searchCity("Johannesburg");
