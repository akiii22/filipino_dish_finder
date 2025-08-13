import React, { useState } from "react";
import recipes from "./data/filipino_recipe.json";
import "./index.css";

const App = () => {
  const [input, setInput] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const userIngredients = input
    .toLowerCase()
    .split(",")
    .map((ing) => ing.trim())
    .filter(Boolean);

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeIngredientsStr = recipe.ingredients.join(" ").toLowerCase();
    return userIngredients.every((userIng) =>
      recipeIngredientsStr.includes(userIng)
    );
  });

  return (
    <>
      <div className="app-container">
        <h1>Recipe Finder</h1>

        <label htmlFor="ingredientsInput">
          Enter ingredients you have (comma separated):
        </label>
        <br />
        <input
          id="ingredientsInput"
          type="text"
          placeholder="e.g. chicken, garlic, soy sauce"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelectedRecipe(null);
          }}
        />

        {input.length > 0 && filteredRecipes.length === 0 && (
          <p className="message-no-recipes">No matching recipes found.</p>
        )}

        {input.length > 0 && filteredRecipes.length > 0 && (
          <ul className="recipe-list">
            {filteredRecipes.map((recipe, idx) => (
              <li key={idx} onClick={() => setSelectedRecipe(recipe)}>
                {recipe.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close modal"
              className="modal-close-btn"
            >
              &times;
            </button>

            <h2>{selectedRecipe.name}</h2>

            <h3>Ingredients:</h3>
            <ul>
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h3>Instructions:</h3>
            <ol>
              {selectedRecipe.instructions
                .split(/\r?\n/)
                .filter((line) => line.trim())
                .map((step, i) => (
                  <li key={i}>{step.trim()}</li>
                ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
