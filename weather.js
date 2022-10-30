window.addEventListener("load", () => {
  let temperatureDiscription = document.querySelector(".temperature-discription");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone")

  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
  

      const API_KEY = "fda25d119864cbc66c1a03d1cd8926aa";
    
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          let temp = data.main.temp
          temperatureDegree.textContent= temp
          // let weth=  data.weather[0].main
         let weatherSummary = data.weather[0].description;
         temperatureDiscription.textContent = weatherSummary;
         locationTimezone.textContent = data.name
     
        });
    });
  }
  
});
