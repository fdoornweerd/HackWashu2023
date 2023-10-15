const express = require('express');
const router = express.Router();
const supabase = require('../supabaseConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../middleware/config');

// Import necessary libraries, including Supabase or your chosen authentication system.

router.post('/signup', async (req, res) => {
    try {
      console.log(req.body);
      const { username, password } = req.body;
  
      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of hashing rounds
  
      // Insert the user data into your Supabase user table
      const { data, error } = await supabase
      .from('user')
      .insert(
        { username: username, password: hashedPassword}
      )
      .select('id');

  
      if (error) {
        console.error(error);
        return res.status(400).json({ error: 'User registration failed', supabaseError: error });
      }

      console.log(data);
      const userId = data[0].id; // Assuming the ID is in the first element of the data array
      const tokenUser = { userId: userId, username: username };
  

      const token = jwt.sign(tokenUser, config.secretKey, { expiresIn: '1h' });
      return res.status(201).json({
        message: 'User registered successfully',
        token: token
      });


      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/profilesetup', async (req, res) => {
    try {
      console.log(req.body);
      const { user_id, email, age, proficientLanguages, learningLanguages, interests } = req.body;
  
  
      // Insert the user data into your Supabase user table
      const { error } = await supabase
      .from('user_info')
      .insert(
        { user_id: user_id, email: email, age: age, proficient_languages: proficientLanguages, learning_languages: learningLanguages, interests: interests }
      )

  
      if (error) {
        console.error(error);
        return res.status(400).json({ error: 'Profile setup failed', supabaseError: error });
      }
  
      return res.status(201).json({ message: 'Profile setup success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


//signing in
router.post('/signin', async (req, res) => {
try {
    const { username, password } = req.body;

    // Fetch user data from the Supabase user table by email
    const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('username', username);

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

router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
  
    // Fetch user data from your Supabase user table based on the user's ID
    const { data, error } = await supabase
      .from('user_info')
      .select('email', 'age', 'proficient_languages', 'learning_languages', 'interests') // Include the fields you want to retrieve
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ error: 'Server error' });
    }

    // Check if a user with the given ID exists
    if (data && data.length > 0) {
      const user = data[0];

      // Return user information in the response
      return res.status(200).json({ user });
    } else {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
