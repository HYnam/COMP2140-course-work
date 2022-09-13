import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import RecipeList from "./pages/RecipeList";
import Recipe from "./pages/Recipe";
import JustTheFacts from "./pages/JustTheFacts";
import Music from "./pages/Music";
import { toneObject } from "./data/instruments.js";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/recipe" element={<RecipeList />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/just-the-facts" element={<JustTheFacts />} />
                <Route path="/music" element={<Music toneObject={toneObject} />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);