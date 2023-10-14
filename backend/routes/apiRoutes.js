const express = require('express');
const router = express.Router();
const supabase = require('../supabaseConfig');
const bcrypt = require('bcrypt');

// Import necessary libraries, including Supabase or your chosen authentication system.

router.post('/signup', async (req, res) => {
    try {
      const { email, password, username, age, proficient_languages, learning_languages, interests } = req.body;
  
      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of hashing rounds
  
      // Insert the user data into your Supabase user table
      const { data, error } = await supabase
        .from('user') // Replace with your actual user table name
        .upsert([
          {
            email,
            password: hashedPassword, // Save the hashed password
            username,
            age,
            proficient_languages,
            learning_languages,
            interests,
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


//signing in
router.post('/signin', async (req, res) => {
try {
    const { email, password } = req.body;

    // Fetch user data from the Supabase user table by email
    const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email);

    if (error) {
    return res.status(500).json({ error: 'Server error' });
    }

    // Check if a user with the given email exists
    if (data && data.length > 0) {
    const user = data[0];

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        // User is authenticated, and you can generate an authentication token here
        // Typically, you would use a JWT (JSON Web Token) for this purpose
        // Return the token in the response
        return res.status(200).json({ message: 'User signed in successfully', token: 'YOUR_AUTH_TOKEN' });
    }
    }

    // User authentication failed
    return res.status(401).json({ error: 'Authentication failed' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;
