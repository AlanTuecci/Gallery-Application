import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './ImageGallery.css';
import '../App.css';
import ImageDetails from './ImageDetails';

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'localhost';

const ImageGallery = () => {
  const { id } = useParams();
  console.log('Received id:', id);

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [showCurrentWeather, setShowCurrentWeather] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Calls server API to get the data related to the images taken at a certain location
        const response = await axios.get(`http://${URL}:${PORT}/api/images/${id}`);
        console.log('Server Response:', response.data);
        setImages(response.data.resources);

        if (response.data.resources.length > 0) {
          const { latitude, longitude, date } = response.data.resources[0];

          //Calls server API to get the Weather Data at the location where the photo was taken at the day of when the photo was taken 
          const pastWeatherResponse = await axios.get(`http://${URL}:${PORT}/api/weather/${latitude}/${longitude}/${date}`);
          console.log('Past Weather Data:', pastWeatherResponse.data);
          setWeather(pastWeatherResponse.data);

          //Calls server API to get the Current Weather Data at the location where the photo was taken at the current day
          const currentWeatherResponse = await axios.get(`http://${URL}:${PORT}/api/currentweather/${latitude}/${longitude}`);
          console.log('Current Weather Data:', currentWeatherResponse.data);
          setCurrentWeather(currentWeatherResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const handleToggleWeather = () => {
    setShowCurrentWeather((prevShowCurrentWeather) => !prevShowCurrentWeather);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className='gallery-container'>
          <div className="gallery">
            {images.length > 0 && (
              <div className="image-item">
                <img src={images[currentImageIndex]?.url} alt={images[currentImageIndex]?.filename} />
              </div>
            )}
            {images.length > 1 && (
              <div className="navigation-buttons">
                <button className="nav-button" onClick={handlePrevClick}>Previous</button>
                <button className="nav-button" onClick={handleNextClick}>Next</button>
              </div>
            )}
          </div>
          <div className="text-section">
            {/*If there is at least 1 image and weather data available, render an ImageDetails component with the respective parameters*/}
            {images.length > 0 && weather && (
              <ImageDetails
                image={images[currentImageIndex]}
                weather={weather}
                currentWeather={currentWeather}
                showCurrentWeather={showCurrentWeather}
              />
            )}
            <button className="nav-button" onClick={handleToggleWeather}>
              {showCurrentWeather ? 'Show Past Weather' : 'Show Current Weather'}
            </button>
          </div>
        </div>
        {/*If there is at least 1 image, render an iframe element that shows the location of the image taken on a map*/}
        {images.length > 0 && (
          <iframe
            title="Google Maps"
            width="100%"
            height="400"
            src={`https://maps.google.com/maps?q=${images[currentImageIndex]?.latitude},${images[currentImageIndex]?.longitude}&output=embed`}
          >
          </iframe>
        )}
        <br /><br /><br />
      </div>
    </div>
  );
};

export default ImageGallery;
