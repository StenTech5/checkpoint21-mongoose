const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const Person = require('./models/person'); // Import the Person model

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample route to test if the server is working
app.get('/', (req, res) => {
  res.send('Hello, Mongoose!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create a new person and save to the database
app.post('/create-person', (req, res) => {
    const { name, age, favoriteFoods } = req.body;
  
    const person = new Person({
      name,
      age,
      favoriteFoods,
    });
  
    person.save((err, data) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(data);
    });
  });


  app.post('/create-many', (req, res) => {
    const people = req.body;
  
    Person.create(people, (err, data) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(data);
    });
  });

  app.get('/find-by-name', (req, res) => {
    const { name } = req.query; // Get the name from the query string
  
    Person.find({ name }, (err, data) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(data);
    });
  });
  

  app.get('/find-by-id/:id', (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
  
    Person.findById(id, (err, data) => {
      if (err) return res.status(500).send(err);
      res.status(200).json(data);
    });
  });
  
  
  
