
const defaultCity = 'Hyderabad';
const apiKey = '195c0346e2mshd0a83a587842a24p13046ajsnceff45fbc0a0';
const apiHost = 'weather-api138.p.rapidapi.com';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost
  }
};
const tempCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

async function fetchData(city) {
  try {
    const response = await fetch(`https://${apiHost}/weather?city_name=${city}`, options);
    const result = await response.json();

    document.getElementById('cityName').textContent = city;
    document.getElementById('temp').textContent = tempCelsius(result.main.temp);
    document.getElementById('feels_like').textContent = tempCelsius(result.main.feels_like);
    document.getElementById('temp_max').textContent = tempCelsius(result.main.temp_max);
    document.getElementById('temp_min').textContent = tempCelsius(result.main.temp_min);
    document.getElementById('humidity').textContent = result.main.humidity;
    document.getElementById('sunrise').textContent = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById('sunset').textContent = new Date(result.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('clouds').textContent = result.clouds.all;
    document.getElementById('wind_speed').textContent = result.wind.speed;
    document.getElementById('wind_direction').textContent = result.wind.deg;
    document.getElementById('pressure').textContent = result.main.pressure;
    document.getElementById('sea_level').innerHTML = result.main.sea_level;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function getWeather(city) {
  fetchData(city);
}

document.addEventListener('DOMContentLoaded', () => {
  getWeather(defaultCity);
});

const cities = ['New York', 'Shanghai', 'London', 'Tokyo'];

async function fetchWeatherData(city) {
  const url = `https://${apiHost}/weather?city_name=${city}`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return {
      city,
      temp: tempCelsius(result.main.temp),
      feels_like: tempCelsius(result.main.feels_like),
      temp_max: tempCelsius(result.main.temp_max),
      temp_min: tempCelsius(result.main.temp_min),
      humidity: result.main.humidity,
      sunrise: new Date(result.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(result.sys.sunset * 1000).toLocaleTimeString(),
      clouds: result.clouds.all,
      wind_speed: result.wind.speed,
      wind_direction: result.wind.deg,
      pressure: result.main.pressure
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

async function updateWeatherTable() {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  for (const city of cities) {
    const data = await fetchWeatherData(city);
    if (data) {
      const row = `
        <tr>
          <th scope="row" class="text-start">${data.city}</th>
          <td>${data.temp}°C</td>
          <td>${data.feels_like}°C</td>
          <td>${data.temp_max}°C</td>
          <td>${data.temp_min}°C</td>
          <td>${data.humidity}%</td>
          <td>${data.sunrise}</td>
          <td>${data.sunset}</td>
          <td>${data.clouds}%</td>
          <td>${data.wind_speed} m/s</td>
          <td>${data.wind_direction}°</td>
          <td>${data.pressure} hPa</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateWeatherTable();
});
