import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/gallery/:id" element={<ImageGallery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
