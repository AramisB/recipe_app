const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://seal-app-jx46s.ondigitalocean.app/api/recipes'],
  credentials: true
}));

const port = process.env.PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Connect to the database
connectDB().then(db => {
  app.locals.db = db; // Save db connection in app locals
  console.log('Database connection successful');

  // Use the apiRouter for all /api routes
  const apiRouter = require('./routes/api');
  app.use('/api', apiRouter);

  // Serve React app for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});
