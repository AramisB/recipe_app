const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;  // Make sure this is correctly set in your .env file
const client = new MongoClient(url);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);  // Make sure this matches your MongoDB database name
    console.log('Database connected');
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
