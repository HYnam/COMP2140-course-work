import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import RecipeList from './pages/RecipeList';
import Recipe from './pages/Recipe';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/recipe" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
