const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Ensure that the uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const port = process.env.PORT || 3001;  // Ensure this matches the port your app is running on

// CORS configuration
app.use(cors({
  origin: 'https://sea-turtle-app-ac82n.ondigitalocean.app',
  credentials: true
}));

let db;

// Connect to the database and store the instance
connectDB()
  .then(database => {
    db = database;
    console.log('Database connected');

    // Fetch all recipes
    app.get('/api/recipes', async (req, res) => {
      try {
        console.log('Fetching recipes...');
        const recipes = await db.collection('recipes').find().toArray();
        res.json(recipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
      }
    });

    // Add a new recipe
    app.post('/api/recipes', async (req, res) => {
      try {
        const result = await db.collection('recipes').insertOne(req.body);
        console.log('Inserted recipe:', result.insertedId);
        res.status(201).json({ _id: result.insertedId, ...req.body });
      } catch (error) {
        console.error('Failed to add recipe:', error);
        res.status(500).send({ error: 'Failed to add recipe' });
      }
    });

    // Update a recipe
    app.put('/api/recipes/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const updatedRecipe = req.body;
        const result = await db.collection('recipes').findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updatedRecipe },
          { returnOriginal: false }
        );

        if (!result.value) {
          return res.status(404).send({ error: 'Recipe not found' });
        }

        res.json(result.value);
      } catch (error) {
        console.error('Failed to update recipe:', error);
        res.status(500).send({ error: 'Failed to update recipe' });
      }
    });

    // Delete a recipe
    app.delete('/api/recipes/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: 'Invalid ID format' });
        }

        console.log(`Deleting recipe with ID: ${id}`);

        const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).send({ error: 'Recipe not found' });
        }

        res.status(204).send();
      } catch (error) {
        console.error('Delete error:', error);
        res.status(500).send({ error: 'Failed to delete recipe' });
      }
    });

    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
