document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "M0LK05qAW3UvC4ZK9wB5WK6kfP2PUTtA"; //api key dito
    const form = document.getElementById("cityForm");
    const weatherDiv = document.getElementById("weather");
    const weatherDiv5 = document.getElementById("weather2");
    const weatherDivHourly = document.getElementById("weather3");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        getWeather(city);
    });

    function getWeather(city) {
        const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    const locationKey = data[0].Key;
                    fetchWeatherData(locationKey);
                    fetchWeatherData5d(locationKey);
                    fetchWeatherDataHourlys(locationKey);
                } else {
                    weatherDiv.innerHTML = '<p>City not found.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching location data:", error);
                weatherDiv.innerHTML = '<p>Error fetching location data.</p>';
            });
    }

    function fetchWeatherData(locationKey) {
        const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    displayWeather(data[0]);
                } else {
                    weatherDiv.innerHTML = '<p>No weather data available.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherDiv.innerHTML = '<p>Error fetching weather data.</p>';
            });
    }

    function fetchWeatherData5d(locationKey) {
        // const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;
        const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
    
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                
                if (data && data.length > 0) {
                    displayWeather2(data[0]);
                } else {
                    weatherDiv5.innerHTML = '<p>No weather data available.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherDiv5.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            });
    }
    
    function fetchWeatherDataHourlys(locationKey) {
        // const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`;
        const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
   
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {

                if (data && data.length > 0) {
                    displayWeather3(data[0]); 
                } else {
                    weatherDivHourly.innerHTML = '<p>No weather data available.</p>';
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherDivHourly.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
            });
    }

    function displayWeather(data) {
        const temperature = data.Temperature.Metric.Value;
        const weather = data.WeatherText;
        const icon = data.WeatherIcon;
        const urlimages = `https://developer.accuweather.com/sites/default/files/${String(icon).padStart(2, '0')}-s.png`;
        const weatherContent = `
            <h2>Current Weather</h2>
            <img src="${urlimages}" alt="Weather Icon" class="image">
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weather}</p>
        `;
        weatherDiv.innerHTML = weatherContent;
    }

    // function displayWeather2(data) {
    //     const temperature = data.Temperature.Metric.Value;
    //     const weather = data.WeatherText;
    //     const icon = data.WeatherIcon;
    //     const urlimages = `https://developer.accuweather.com/sites/default/files/${String(icon).padStart(2, '0')}-s.png`;
    //     const weatherContent = `
    //         <h2>5 DAYS Weather</h2>
    //         <img src="${urlimages}" alt="Weather Icon" class="image">
    //         <p>Temperature: ${temperature}°C</p>
    //         <p>Weather: ${weather}</p>
    //     `;
    //     weatherDiv5.innerHTML = weatherContent;

    // }

    // function displayWeather3(data) {
    //     const temperature = data.Temperature.Metric.Value;
    //     const weather = data.WeatherText;
    //     const icon = data.WeatherIcon;
    //     const urlimages = `https://developer.accuweather.com/sites/default/files/${String(icon).padStart(2, '0')}-s.png`;
    //     const weatherContent = `
    //         <h2>1/12 Hourly Weather</h2>
    //         <img src="${urlimages}" alt="Weather Icon" class="image">
    //         <p>Temperature: ${temperature}°C</p>
    //         <p>Weather: ${weather}</p>
    //     `;
    //     weatherDivHourly.innerHTML = weatherContent;
    // }
});
