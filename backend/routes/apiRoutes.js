const express = require('express');
const router = express.Router();
const supabase = require('../supabaseConfig');

// Import necessary libraries, including Supabase or your chosen authentication system.

// Route for user registration
router.post('/signup', async (req, res) => {
    try {
      // Extract user registration data from the request body
      const { email, password, username } = req.body;
  
      // Insert the user data into your Supabase user table
      const { data, error } = await supabase
        .from('user') // Replace with your actual user table name
        .upsert([
          {
            email,
            password, // You may want to hash the password before saving it
            username,
            age,
            proficient_languages,
            learning_languages,
            interests
          },
        ]);
  
      if (error) {
        return res.status(400).json({ error: 'User registration failed' });
      }
  
      // User registration successful
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;



module.exports = router;
