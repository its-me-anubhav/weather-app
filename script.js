// OpenWeather API details
const apiKey = 'YOUR_API_KEY'; // Replace with your actual OpenWeather API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather by city name
async function fetchWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('City not found. Please try again.');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Function to fetch weather using GPS coordinates
async function fetchWeatherByLocation(lat, lon) {
  try {
    const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Unable to fetch weather data for your location.');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Function to display weather data in the app
function displayWeather(data) {
  document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
}

// Function to get the user's location using the Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      () => {
        alert('Location access denied. Please use the search bar to find weather details.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

// Load weather for user's location when the page loads
window.onload = getUserLocation;
