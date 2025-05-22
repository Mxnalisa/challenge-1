function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  let apiKey = "d7852e3faob94308902a4f5e758t6a40";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.temperature.current);
    let temperatureElement = document.querySelector(
      ".current-temperature-value"
    );

    temperatureElement.innerHTML = `${temperature}°C`;

    let humidity = response.data.temperature.humidity;
    let windSpeed = Math.round(response.data.wind.speed);
    let weatherDescription = response.data.condition.description;

    let detailsElement = document.querySelector(".current-details");
    detailsElement.innerHTML = `
      ${formatDate(new Date())}, ${weatherDescription} <br />
      Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>
    `;
  });
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
