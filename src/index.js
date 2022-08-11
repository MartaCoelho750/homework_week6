let now = new Date();
let date = now.getDate();
let hours = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");

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
let currentDate = document.querySelector("#current_date");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function currentCity(event) {
  event.preventDefault();
  let location = document.querySelector("#search");
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = location.value;

  search(location.value);
}
let city = document.querySelector("#search_form");
city.addEventListener("submit", currentCity);

function changeTemperature(event) {
  event.preventDefault();
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  celsius.innerHTML = `27`;
  fahrenheit.innerHTML = `80`;
}
let displayTemperature = document.querySelector(".temperature");
displayTemperature.addEventListener("click", changeTemperature);

//week 5 API's

let cityElement = "Porto";
let apiKey = "db38f9874aaed6906ad051b582f0daff";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

axios.get(apiUrl).then(showTemperature);

function search(city) {
  let apiKey = "db38f9874aaed6906ad051b582f0daff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "db38f9874aaed6906ad051b582f0daff";
  let apiUrlNow = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlNow).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#input");
button.addEventListener("click", getCurrentPosition);
