import React from "react";
import Template from "../components/Template";
import { recipes } from "../data/recipes";
import { Link } from "react-router-dom";

export default function RecipeList() {
    return (
        <Template title="List of Recipes">
            <ul>
                {recipes.map((recipe) => (
                    <li>
                        <Link to={`/recipe/${recipe.id}`}>
                            {recipe.title}
                        </Link>
                        <ul>
                            <li>
                                Rating: {recipe.rating} / 5
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </Template>
    );
}