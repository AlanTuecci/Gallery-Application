import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../App.css'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-content">
          <h1>Welcome to Alan Tuecci's Gallery</h1>
          <h2>Explore galleries from different locations.</h2>
          {/*Using the react router dom, create buttons that lead to gallery pages*/}
          <div className="gallery-links">
            <Link to="/gallery/alesund"><h3>Norway - Alesund</h3></Link>
            <Link to="/gallery/geiranger"><h3>Norway - Geiranger</h3></Link>
            <Link to="/gallery/fjellstrekninger"><h3>Norway - Fjellstrekninger</h3></Link>
            <Link to="/gallery/amsterdam"><h3>Netherlands - Amsterdam</h3></Link>
            <Link to="/gallery/london"><h3>United Kingdom - London</h3></Link>
            <Link to="/gallery/brooklyn-army-terminal"><h3>New York - Brooklyn Army Terminal</h3></Link>
            <Link to="/gallery/central-park"><h3>New York - Central Park</h3></Link>
            <Link to="/gallery/dumbo-carousel"><h3>New York - Dumbo Carousel</h3></Link>
            <Link to="/gallery/hunter-college"><h3>New York - Hunter College</h3></Link>
            <Link to="/gallery/industry-city"><h3>New York - Industry City</h3></Link>
            <Link to="/gallery/pier-17-brooklyn-bridge"><h3>New York - Pier 17</h3></Link>
            <Link to="/gallery/prospect-park"><h3>New York - Prospect Park</h3></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
