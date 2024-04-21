// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ImageGallery from './components/ImageGallery';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery/:id" element={<ImageGallery />} />
      </Routes>
    </Router>
  );
};

export default App;
