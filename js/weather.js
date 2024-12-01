
      function fetchWeatherData(city) {
        console.log(city);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=636437158fe4102977e03126b970315e`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=636437158fe4102977e03126b970315e`;
        
      
        const weatherSection = document.querySelector(
          '.current__whether-innerdata'
        );
        weatherSection.style.display = 'none';

        document.getElementById('fallback-message').style.display = 'none';

        document.getElementById('temperature').innerText = '__°C';
        document.getElementById('description').innerText = '';
        document.getElementById('date').innerText = '';
        document.getElementById('location').innerText = '';

        
        if (!city) {
          document.getElementById('fallback-message').style.display = 'block';
          return; 
        }

       
        fetch(weatherUrl)
          .then((response) => {
            if (!response.ok) {
              // If the response is not ok, throw an error
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('response', data);
            // Process weather data 
            document.getElementById('city_input').value = '';
            const celcius = 273.15;
            document.getElementById('temperature').innerText = `${(
              data.main.temp - celcius
            ).toFixed(1)}°C`;
            document.getElementById('description').innerText =
              data.weather[0].description;
            document.getElementById('date').innerText =
              new Date().toLocaleDateString();
            document.getElementById('location').innerText = data.name;
            document.getElementById(
              'weather-icon'
            ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherSection.style.display = 'flex';
            // Hide the fallback message if the data is fetched successfully
            document.getElementById('fallback-message').style.display = 'none';
          })
          .catch((error) => {
            // Show the fallback message on error
            console.error('Error fetching weather data:', error);
            document.getElementById('fallback-message').style.display = 'block';
          });

        // Fetch 5-day forecast data
        fetch(forecastUrl)
          .then((response) => response.json())
          .then((data) => {
            //const celcius = 273.15;
            const forecastList = data.list;
            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = ''; // Clear previous forecast
            document.getElementById('fallback-message_forcast').style.display =
              'none';
            for (let i = 0; i < forecastList.length; i += 8) {
              // Display one forecast per day
              const day = forecastList[i];
              const tempCelsius = (day.main.temp - 273.15).toFixed(2);
              const listItem = document.createElement('li');
              listItem.classList.add('list-group-item');
              listItem.innerHTML = `
                            <div>${new Date(
                              day.dt * 1000
                            ).toLocaleDateString()}</div>
                            <div>${tempCelsius}°C</div>
                            <img src="https://openweathermap.org/img/wn/${
                              day.weather[0].icon
                            }.png" alt="Icon">
                        `;
              forecastElement.appendChild(listItem);
            }
          })
          .catch((error) =>
            console.error('Error fetching forecast data:', error)
          );
      }

      document.getElementById('Searchbtn').addEventListener('click', () => {
      
        const city = document.getElementById('city_input').value;
        fetchWeatherData(city);
      });
      // Event listener for enter key in input field
      document
        .getElementById('city_input')
        .addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            // Check if Enter key is pressed

            event.preventDefault(); // Prevent form submission

            const city = event.target.value;
            fetchWeatherData(city);
          }
        });
      document.getElementById('locationbtn').addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5fe36b192ffd1c36dffb6752bc1722b2`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5fe36b192ffd1c36dffb6752bc1722b2`;
            const weatherSection = document.querySelector(
              '.current__whether-innerdata'
            );
            weatherSection.style.display = 'none';

            // Fetch current weather data
            fetch(weatherUrl)
              .then((response) => {
                console.log('response', response);
                if (!response.ok) {
                  // If the response is not ok, throw an error
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((data) => {
            console.log('response', data);
            // Process weather data and update UI
            document.getElementById('city_input').value = '';
            const celcius = 273.15;
            document.getElementById('temperature').innerText = `${(
              data.main.temp - celcius
            ).toFixed(1)}°C`;
                document.getElementById('description').innerText =
                  data.weather[0].description;
                document.getElementById('date').innerText =
                  new Date().toLocaleDateString();
                document.getElementById('location').innerText = data.name;
                document.getElementById(
                  'weather-icon'
                ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                weatherSection.style.display = 'flex';
                // Hide the fallback message if the data is fetched successfully
                document.getElementById('fallback-message').style.display =
                  'none';
              })
              .catch((error) => {
                // Show the fallback message on error
                console.error('Error fetching weather data:', error);
                document.getElementById('fallback-message').style.display =
                  'block';
              });

            fetch(forecastUrl)
              .then((response) => response.json())
              .then((data) => {
            //const celcius = 273.15;
            const forecastList = data.list;
            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = ''; // Clear previous forecast
            document.getElementById('fallback-message_forcast').style.display =
              'none';
            for (let i = 0; i < forecastList.length; i += 8) {
              // Display one forecast per day
              const day = forecastList[i];
              const tempCelsius = (day.main.temp - 273.15).toFixed(2);
              const listItem = document.createElement('li');
              listItem.classList.add('list-group-item');
              listItem.innerHTML = `
                            <div>${new Date(
                              day.dt * 1000
                            ).toLocaleDateString()}</div>
                            <div>${tempCelsius}°C</div>
                            <img src="https://openweathermap.org/img/wn/${
                              day.weather[0].icon
                            }.png" alt="Icon">
                        `;
              forecastElement.appendChild(listItem);
            }
          })
              .catch((error) =>
                console.error('Error fetching forecast data:', error)
              );
          });
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      });

    
//weather map
const apiKey = '636437158fe4102977e03126b970315e';  // API Key for OpenWeatherMap
const map = L.map('map').setView([0, 0], 1);  // Initialize the map with initial view at coordinates (0,0) and zoom level 1

// Add OpenStreetMap tile layer as the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'  // Attribution for OpenStreetMap usage
}).addTo(map);

// Declare variables for the weather layer and the current selected parameter
let weatherLayer;
let currentParameter = 'temp_new';  // Default parameter is temperature

// Define the configurations for each weather parameter (temperature, precipitation, clouds, pressure)
const parameterConfigs = {
  'temp_new': {
    min: -10, max: 40, unit: '°C',  // Temperature in Celsius
    getColor: (value) => {
      if (value <= 0) return '#0000FF';  // Blue for cold
      if (value <= 10) return '#00FFFF'; // Cyan for cool
      if (value <= 20) return '#00FF00'; // Green for moderate
      if (value <= 30) return '#FFFF00'; // Yellow for warm
      if (value <= 35) return '#FFA500'; // Orange for hot
      return '#FF0000'; // Red for very hot
    }
  },
  // Other weather parameters (precipitation, clouds, pressure) are defined similarly
  'precipitation_new': {
    min: 0, max: 100, unit: 'mm',
    getColor: (value) => {
      if (value <= 10) return '#FFFFFF'; // No rain: white
      if (value <= 25) return '#A6F28F'; // Light rain: light green
      if (value <= 50) return '#3AD900'; // Moderate rain: green
      if (value <= 75) return '#00B3FF'; // Heavy rain: blue
      return '#0000FF'; // Very heavy rain: dark blue
    }
  },
  'clouds_new': {
    min: 0, max: 100, unit: '%',
    getColor: (value) => {
      if (value <= 20) return '#FFFFFF'; // Clear skies: white
      if (value <= 40) return '#E6E6E6'; // Light clouds: light grey
      if (value <= 60) return '#C8C8C8'; // Moderate clouds: grey
      if (value <= 80) return '#969696'; // Dense clouds: dark grey
      return '#646464'; // Overcast: very dark grey
    }
  },
  'pressure_new': {
    min: 950, max: 1050, unit: 'hPa',
    getColor: (value) => {
      if (value <= 980) return '#800080'; // Low pressure: purple
      if (value <= 1000) return '#9932CC'; // Slightly low: dark violet
      if (value <= 1020) return '#E6E6FA'; // Normal pressure: lavender
      if (value <= 1040) return '#FFA07A'; // Slightly high: light coral
      return '#FF4500'; // High pressure: orange-red
    }
  }
};

// Function to update the weather layer on the map based on the selected parameter and its value
function updateWeatherLayer(parameter, value) {
  if (weatherLayer) {
    map.removeLayer(weatherLayer); // Remove the current weather layer if it exists
  }

  // Add a new weather layer using the OpenWeatherMap tiles based on the selected parameter
  weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/${parameter}/{z}/{x}/{y}.png?appid=${apiKey}`, {
    maxZoom: 10,  // Set the max zoom level
    opacity: 0.7  // Set the opacity of the weather layer
  }).addTo(map);

  // Determine the color based on the current parameter value
  const color = parameterConfigs[parameter].getColor(value);
  
  // Apply a hue-rotation filter to adjust the layer's color to match the parameter's color
  weatherLayer.setStyle({ filter: `hue-rotate(${getHueRotation(color)}deg)` });
}

// Helper function to get hue rotation values based on color
function getHueRotation(color) {
  const hues = {
    '#0000FF': 240, '#00FFFF': 180, '#00FF00': 120,
    '#FFFF00': 60, '#FFA500': 30, '#FF0000': 0,
    '#FFFFFF': 0, '#A6F28F': 90, '#3AD900': 100,
    '#00B3FF': 195, '#E6E6E6': 0, '#C8C8C8': 0,
    '#969696': 0, '#646464': 0, '#800080': 300,
    '#9932CC': 280, '#E6E6FA': 260, '#FFA07A': 20,
    '#FF4500': 15
  };
  return hues[color] || 0; // Default to 0 if no match is found
}

// Function to update the slider range and value display based on the selected parameter
function updateSlider(parameter) {
  const config = parameterConfigs[parameter];  // Get configuration for the selected parameter
  const slider = document.getElementById('weather-slider');
  const display = document.getElementById('value-display');
  
  slider.min = config.min;  // Set the slider's minimum value
  slider.max = config.max;  // Set the slider's maximum value
  slider.value = (config.min + config.max) / 2;  // Set the initial slider value to the midpoint
  
  display.textContent = `${slider.value}${config.unit}`;  // Display the current value with unit
  display.style.color = config.getColor(parseFloat(slider.value));  // Set the display color based on the value
  
  updateWeatherLayer(parameter, parseFloat(slider.value));  // Update the weather layer with the initial value
}

// Event listener for the "Temperature" button
document.getElementById('tempBtn').addEventListener('click', () => {
  currentParameter = 'temp_new';  // Set the parameter to temperature
  updateWeatherLayer(currentParameter);  // Update the weather layer with the new parameter
  updateSlider(currentParameter);  // Update the slider for temperature
  setActiveButton('tempBtn');  // Highlight the active button (temperature)
});

// Event listener for the "Precipitation" button
document.getElementById('precipBtn').addEventListener('click', () => {
  currentParameter = 'precipitation_new';  // Set the parameter to precipitation
  updateSlider(currentParameter);  // Update the slider for precipitation
  setActiveButton('precipBtn');  // Highlight the active button (precipitation)
});

// Event listener for the "Clouds" button
document.getElementById('cloudBtn').addEventListener('click', () => {
  currentParameter = 'clouds_new';  // Set the parameter to clouds
  updateSlider(currentParameter);  // Update the slider for clouds
  setActiveButton('cloudBtn');  // Highlight the active button (clouds)
});

// Event listener for the "Pressure" button
document.getElementById('pressureBtn').addEventListener('click', () => {
  currentParameter = 'pressure_new';  // Set the parameter to pressure
  updateSlider(currentParameter);  // Update the slider for pressure
  setActiveButton('pressureBtn');  // Highlight the active button (pressure)
});

// Slider input event listener
document.getElementById('weather-slider').addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);  // Get the current value of the slider
  const config = parameterConfigs[currentParameter];  // Get configuration for the selected parameter
  const display = document.getElementById('value-display');
  
  display.textContent = `${value}${config.unit}`;  // Update the display with the new value
  display.style.color = config.getColor(value);  // Update the color of the display based on the value
  
  updateWeatherLayer(currentParameter, value);  // Update the weather layer with the new value
});

// Initialize the slider for the default parameter ('temp_new') and set the active button
updateSlider('temp_new');
setActiveButton('tempBtn');

// Handle window resizing to make sure the map remains responsive
window.addEventListener('resize', () => {
    map.invalidateSize();  // Adjust the map size when the window is resized
});
