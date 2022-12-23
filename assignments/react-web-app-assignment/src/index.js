import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { toneObject, toneTransport, tonePart } from './data/instruments.js';
import App from './pages/App';
import Create from "./pages/CreateSameple";
import Edit from "./pages/Edit";
import Share from "./pages/Share";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create-sample" element={<Create 
              toneObject={toneObject}
              toneTransport = {toneTransport}
              tonePart = {tonePart}
            />} />
            <Route path="/edit/:id" element={<Edit 
              toneObject = {toneObject}
              toneTransport = {toneTransport}
              tonePart = {tonePart}
            />} />
            <Route path="/share" element={<Share />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
