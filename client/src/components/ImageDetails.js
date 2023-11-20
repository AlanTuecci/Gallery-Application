import React from 'react';

const ImageDetails = ({ image, weather, currentWeather, showCurrentWeather }) => {
  //Helper function that displays Sunrise and Sunset information where the photo was taken
  const renderSunriseAndSunset = (weatherData, prefix) => {
    return (
      <div>
        <h3>{prefix} Sunrise and Sunset</h3>
        <p>
          {prefix === 'Past' ? 'Past ' : 'Current '}{new Date(weatherData.daily.sunrise[0]).toLocaleTimeString()}<br />
          {prefix === 'Past' ? 'Past ' : 'Current '}{new Date(weatherData.daily.sunset[0]).toLocaleTimeString()}<br />
        </p>
      </div>
    );
  };

  return (
    <div>
      <h3>Image Information</h3>
      <p>
        This photo was taken on {image.date_taken} at {image.time_taken}.<br />
        This photo was taken at latitude: {image.latitude}, longitude: {image.longitude}.<br /><br />
        The exposure is {image.exposure} at {image.aperture}.<br />
        The focal length is {image.focal_length}.<br />
        The ISO speed rating is {image.iso}.<br />
        {showCurrentWeather ? (
          currentWeather && currentWeather.daily && currentWeather.daily.sunrise && currentWeather.daily.sunset && (
            renderSunriseAndSunset(currentWeather, 'Current')
          )
        ) : (
          weather && weather.daily && weather.daily.sunrise && weather.daily.sunset && (
            renderSunriseAndSunset(weather, 'Past')
          )
        )}
        {/*Displays the past/current weather information in a readable format*/}
        {showCurrentWeather ? (
          currentWeather && currentWeather.hourly && currentWeather.hourly.time && currentWeather.hourly.time.length > 0 && (
            <div>
              <h3>Current Hourly Weather</h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temperature (°C)</th>
                    <th>Precipitation (mm)</th>
                    <th>Cloud Cover (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWeather.hourly.time.map((time, index) => (
                    <tr key={index}>
                      <td>{new Date(time).toLocaleTimeString()}</td>
                      <td>{currentWeather.hourly.temperature_2m[index]}°C</td>
                      <td>{currentWeather.hourly.precipitation[index] || 0} mm</td>
                      <td>{currentWeather.hourly.cloud_cover[index]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          weather && weather.hourly && weather.hourly.time && weather.hourly.time.length > 0 && (
            <div>
              <h3>Hourly Weather when the Image was Taken</h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temperature (°C)</th>
                    <th>Precipitation (mm)</th>
                    <th>Cloud Cover (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {weather.hourly.time.map((time, index) => (
                    <tr key={index}>
                      <td>{new Date(time).toLocaleTimeString()}</td>
                      <td>{weather.hourly.temperature_2m[index]}°C</td>
                      <td>{weather.hourly.precipitation[index] || 0} mm</td>
                      <td>{weather.hourly.cloud_cover[index]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </p>
    </div>
  );
};

export default ImageDetails;
