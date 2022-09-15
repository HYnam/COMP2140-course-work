import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './pages/App';
import MusicList from "./pages/MusicList";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/music" element={<MusicList />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
