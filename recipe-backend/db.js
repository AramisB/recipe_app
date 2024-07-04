const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

const client = new MongoClient(uri); // No need for useNewUrlParser and useUnifiedTopology

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(); // Return the database instance
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err; // Rethrow the error to be handled by the caller
  }
}

module.exports = connectDB;
