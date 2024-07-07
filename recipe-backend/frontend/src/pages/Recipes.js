import React, { useEffect, useState } from 'react';
import '../styles/recipes.css'; // Import the CSS file

const Recipes = ({ Data }) => {
  const [recipes, setRecipes] = useState(Data || []);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(Data || []);

  useEffect(() => {
    if (!Data) {
      fetch('http://localhost:3001/api/recipes')
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data in Recipes:', data); // Log data for debugging
          setRecipes(data);
          setFilteredRecipes(data);
        })
        .catch((error) => console.error('Error fetching recipes:', error));
    } else {
      console.log('Using provided Data:', Data); // Log provided Data
    }
  }, [Data]);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, recipes]);

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="recipes">
        {filteredRecipes.map((recipe) => (
          <div className="recipe" key={recipe._id}>
            <h2>{recipe.title}</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p>{recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
