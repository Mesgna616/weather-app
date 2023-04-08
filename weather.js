const errorEl = document.querySelector(".error");

const weather = () => {
  let apiKey = "a8f6179630de50582203e8324ec4a157";

  const searchButtonEl = document.querySelector(".search button");
  const searchBarEl = document.querySelector(".search-bar");

  document.body.style.backgroundImage = 'url("img/globe-rmy.png")';
  // Photo by Benjamin Davies on Unsplash

  // If the user's location is available this will render the data for that location
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data))
      .catch((error) => (errorEl.innerText = error));
  });

  // Users can manually search for locations
  searchButtonEl.addEventListener("click", () => {
    if (!searchBarEl.value) {
      errorEl.innerText = "Please enter a location"; // If the user does not enter a location an error will be displayed
      setTimeout(() => (errorEl.innerText = ""), 2000); // Clears the error after 2 seconds
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchBarEl.value}&units=metric&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => (errorEl.innerText = error));
    }
    searchBarEl.value = ""; // Clears the search input when the search button is clicked
  });
};

const displayWeather = (data) => {
  const cityEl = document.querySelector(".city");
  const iconEl = document.querySelector(".icon");
  const descriptionEl = document.querySelector(".description");
  const temperatureEl = document.querySelector(".temperature");
  const feelsLikeEl = document.querySelector(".feels-like");
  const humidityEl = document.querySelector(".humidity");
  const windEl = document.querySelector(".wind");

  // Checks if the location exists in the api
  if (data.cod === "404") {
    errorEl.innerText = "Location not found";
    setTimeout(() => (errorEl.innerText = ""), 2000);
  } else {
    // Destructures the data/object
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const { speed } = data.wind;

    errorEl.innerHTML = "";
    cityEl.innerText = name;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}.png`; // Renders an icon according to the weather condition provided by the api
    temperatureEl.innerHTML = `${Math.round(temp)}&deg;C`;
    feelsLikeEl.innerHTML = `Feels like ${Math.round(feels_like)}&deg;C`;
    descriptionEl.innerText = description;
    humidityEl.innerText = `Humidity: ${humidity}%`;
    windEl.innerText = `Wind speed: ${Math.round(speed * 3.6)} km/h`;
  }
};

window.onload = weather;
