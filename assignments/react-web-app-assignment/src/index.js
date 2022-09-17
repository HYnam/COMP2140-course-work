import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './pages/App';
import Create from "./pages/CreateSameple";
import Edit from "./pages/Edit";
import Share from "./pages/Share";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create-sample" element={<Create />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/share" element={<Share />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
