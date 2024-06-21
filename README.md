# Welcome To My Gallery Application!
This repository contains the code for a full-stack application that allows users to see photographs that I have taken in the past.
The purpose of this application is to help beginner photographers see how weather conditions and camera settings can change how their pictures look.

## This site was deployed on [Render](https://gallery-3vk6.onrender.com)
Please note that this deployment was done on Render's free-tier, which means that the site may spin-down with inactivity.
Render says that spun-down sites may take over 50 seconds to resume, so if the link seems to be broken, it likely means that the service has spun-down and needs to be resumed.

## Features
### Convenient image information display
Users can see the following:
* The exact time and date of when image was taken.
* The latitude and longitude of the location where the image was taken.
* The camera's exposure (in seconds) for a specific image.
* The camera's aperture size for a specific image.
* The camera's focal length for a specific image.
* The camera's ISO speed rating for a specific image.
### Remote image access With Cloudinary
Cloudinary was used in this project to allow for fast and free remote storage of my high-resolution images.
### 24-hour weather data access at the location the image was taken for both the day the image was taken and the current day
Photographers can see the following for both the day the image was taken and the current day:
* The sunset/sunrise times at the location where the image was taken.
* The hourly temperature (in celsius) for 24 hours at the location where the image was taken.
* The hourly precipitation (in millimeters) for 24 hours at the location where the image was taken.
* The hourly cloud cover (as a percentage) for 24 hours at the location where the image was taken.
### Embedded Google Maps element
Since the latitude and longitude of the location where the images were taken are known, the site contains an embedded Google Maps Element to make it easier for users to find directions to the location if they wish to recreate the image I took.

## How to Run Locally
To run this application locally, please make sure that your system has Node.js installed.
Once you confirmed that Node.js is installed, please clone this repository from GitHub, and make the following changes:
1. In the root directory: Find the .env file, and update REACT_APP_URL to 'localhost'.
    * Optional: In that same .env file, you can change REACT_APP_PORT to any open ephemeral port.
2. In the backend directory: Find the server.js file, and replace "gallery-3vk6.onrender.com" in `const URL = process.env.REACT_APP_URL || "gallery-3vk6.onrender.com";` to the same URL you put in the 1st step.
    * If you changed the port number in the 1st step, then in that same server.js file, replace 3000 in `const PORT = process.env.REACT_APP_PORT || 3000;` with that same port number.
3. In the frontend directory: Navigate to frontend\src\components, find the imageGallery.js file, and replace "gallery-3vk6.onrender.com" in `const URL = process.env.REACT_APP_URL || "gallery-3vk6.onrender.com";` to the same URL you put in the 1st step.

Once the changes are made, open a terminal, and change the directory to the root directory of this application.
There are 2 steps to starting up the application:
1. The Build Phase
   Run `npm run build` from the root directory and wait for the command to finish executing.
2. The Run Phase
   Run `npm start` from the root directory and wait for the console to display 2 messages saying "Server is running on url: ${URL}" and "Server is running on port: ${PORT}"

Once the server begins running, open a browser of your choice, and navigate to URL:PORT (ex: localhost:2000)
