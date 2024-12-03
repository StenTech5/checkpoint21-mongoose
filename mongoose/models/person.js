const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  age: { type: Number }, // Age is optional
  favoriteFoods: { type: [String], required: true }, // Favorite foods as an array of strings
});

// Create the Person model from the schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person; // Export the model
