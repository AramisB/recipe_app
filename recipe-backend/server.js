const express = require('express');
const cors = require('cors');
const path = require('path');
const { ObjectId } = require('mongodb');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://seal-app-jx46s.ondigitalocean.app/'],
  credentials: true
}));

const port = process.env.PORT || 3001; 

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

let db;

// Connect to the database
connectDB()
  .then(database => {
    db = database;
    console.log('Database connected');

    app.get('/api/recipes', async (req, res) => {
      try {
        const recipes = await db.collection('recipes').find().toArray();
        res.json(recipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
      }
    });

    app.post('/api/recipes', async (req, res) => {
      try {
        const result = await db.collection('recipes').insertOne(req.body);
        res.status(201).json({ _id: result.insertedId, ...req.body });
      } catch (error) {
        console.error('Failed to add recipe:', error);
        res.status(500).send({ error: 'Failed to add recipe' });
      }
    });

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

    app.delete('/api/recipes/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: 'Invalid ID format' });
        }

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

    // Serve React app for all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
