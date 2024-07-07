const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Middleware to ensure db is available
router.use((req, res, next) => {
  if (!req.app.locals.db) {
    console.error('Database connection not available');
    return res.status(500).json({ message: 'Failed to connect to database' });
  }
  next();
});

// Get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const recipes = await db.collection('recipes').find().toArray();
    res.json(recipes);
  } catch (err) {
    console.error('Failed to fetch recipes:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get a single recipe by ID
router.get('/recipes/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(req.params.id) });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    console.error('Failed to fetch recipe:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new recipe
router.post('/recipes', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await db.collection('recipes').insertOne(req.body);
    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch (err) {
    console.error('Failed to add recipe:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
router.put('/recipes/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    const updatedRecipe = req.body;
    const result = await db.collection('recipes').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedRecipe },
      { returnOriginal: false }
    );

    if (!result.value) return res.status(404).json({ message: 'Recipe not found' });
    res.json(result.value);
  } catch (err) {
    console.error('Failed to update recipe:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete('/recipes/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID format' });

    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Recipe not found' });

    res.status(204).send();
  } catch (err) {
    console.error('Failed to delete recipe:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
