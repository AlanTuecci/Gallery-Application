const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const axios = require("axios");

const { config } = require("dotenv");
config();

const app = express();
const URL = process.env.REACT_APP_URL || "gallery-3vk6.onrender.com";
const PORT = process.env.REACT_APP_PORT || 3000;

app.use(cors());

app.use(express.static("../frontend/build"));

//Defines the function used to give the client access to the .json file for the photos requested
//The .json files are written by Alan Tuecci and contain all image information such as camera information, time and data, and a link to it (the images themselves are stored in Cloudinary)
app.get("/gallery/api/images/:gallery", async (req, res) => {
  let galleryName = req.params.gallery;
  galleryName = path.basename(galleryName);
  const jsonFilePath = path.join(__dirname, "photo-metadata", `${galleryName}.json`);

  try {
    const jsonData = await fs.readFile(jsonFilePath, "utf-8");
    const imageArray = JSON.parse(jsonData);
    res.json(imageArray);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Defines the function used to communicate and retrieve data from the OpenMeteo Historical Weather API
app.get("/gallery/api/weather/:latitude/:longitude/:date", async (req, res) => {
  const { latitude, longitude, date } = req.params;

  try {
    const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&hourly=temperature_2m,precipitation,cloud_cover&daily=sunrise,sunset&timezone=auto`;

    const response = await axios.get(apiUrl);

    const data = response.data;

    const weatherData = {
      latitude: data.latitude,
      longitude: data.longitude,
      generationtime_ms: data.generationtime_ms,
      utc_offset_seconds: data.utc_offset_seconds,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      elevation: data.elevation,
      hourly_units: data.hourly_units,
      hourly: data.hourly,
      daily_units: data.daily_units,
      daily: data.daily,
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Defines the function used to communicate and retrieve data from the OpenMeteo Weather Forecast API
app.get("/gallery/api/currentweather/:latitude/:longitude", async (req, res) => {
  const { latitude, longitude } = req.params;

  try {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,cloud_cover&daily=sunrise,sunset&timezone=auto&forecast_days=1`;

    const response = await axios.get(apiUrl);

    const data = response.data;

    const currentWeatherData = {
      latitude: data.latitude,
      longitude: data.longitude,
      generationtime_ms: data.generationtime_ms,
      utc_offset_seconds: data.utc_offset_seconds,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      elevation: data.elevation,
      hourly_units: data.hourly_units,
      hourly: data.hourly,
      daily_units: data.daily_units,
      daily: data.daily,
    };

    res.json(currentWeatherData);
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//fixes the "cannot GET /url" error when refreshing the client-side app.
//ensures that all server requests will be redirected to index.html, which
//will make sure that the react-router-dom will handle the appropriate requests.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running in: ${process.env.NODE_ENV} mode.`);
  console.log(`Server is running on url: ${URL}.`);
  console.log(`Server is running on port: ${PORT}.`);
});
