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

    // Fetch user data from your Supabase user_info table based on the user's ID
    const { data, error } = await supabase
      .from('user_info')
      .select('email, age, proficient_languages,learning_languages, interests') // Include the fields you want to retrieve
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ error: 'Server error' });
    }

    // Check if a user with the given ID exists
    if (data) {
      // Return user information in the response
      return res.status(200).json({ user: data });
    } else {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/get-recommendations/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("userId: " + userId);


    const { data, error } = await supabase.rpc('get_user_recommendations', { userid: userId});
    
    if (error) {
      return res.status(500).json({ error: 'Server error', supabaseError: error });
    }
    
    console.log(data);
    if (data) {
      return res.status(200).json({ recommendations: data });
    } else {
      return res.status(404).json({ error: 'Recommendation data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const recommendationsQuery = `
    SELECT
        ui1.user_id AS user_id_1,
        ui2.user_id AS user_id_2,
        array_to_string(ui1.proficient_languages, ', ') AS user1_proficient_languages,
        array_to_string(ui1.learning_languages, ', ') AS user1_learning_languages,
        array_to_string(ui2.proficient_languages, ', ') AS user2_proficient_languages,
        array_to_string(ui2.learning_languages, ', ') AS user2_learning_languages
    FROM public.user_info ui1
    JOIN public.user_info ui2
    ON ui1.user_id = $userId
    AND ui1.user_id <> ui2.user_id
    AND (
        ui1.proficient_languages && ui2.learning_languages
        AND ui1.learning_languages && ui2.proficient_languages
    )
    ORDER BY
        user1_proficient_languages,
        user1_learning_languages,
        user2_proficient_languages,
        user2_learning_languages;
`;


//this is the query to go back to to make sure it works
const goodQuery = `SELECT
ui1.user_id AS user_id_1,
ui2.user_id AS user_id_2,
array_to_string(ui1.proficient_languages, ', ') AS user1_proficient_languages,
array_to_string(ui1.learning_languages, ', ') AS user1_learning_languages,
array_to_string(ui2.proficient_languages, ', ') AS user2_proficient_languages,
array_to_string(ui2.learning_languages, ', ') AS user2_learning_languages
FROM public.user_info ui1
JOIN public.user_info ui2
ON ui1.user_id = 18  -- Replace 18 with the user ID you want to compare
AND ui1.user_id <> ui2.user_id
AND (
ui1.proficient_languages && ui2.learning_languages
AND ui1.learning_languages && ui2.proficient_languages
)
ORDER BY
user1_proficient_languages,
user1_learning_languages,
user2_proficient_languages,
user2_learning_languages;`;


const goodConciseQuery = `SELECT
ui1.user_id AS user_id_1,
ui2.user_id AS user_id_2
FROM public.user_info ui1
JOIN public.user_info ui2
ON ui1.user_id = 18  -- Subject user ID (user 18)
AND ui1.user_id <> ui2.user_id
AND (
ui1.proficient_languages && ui2.learning_languages
AND ui1.learning_languages && ui2.proficient_languages
)
ORDER BY
ui2.proficient_languages, -- Order by the proficient languages of user2
ui2.learning_languages, -- Order by the learning languages of user2
ui1.proficient_languages, -- Order by the proficient languages of user1
ui1.learning_languages; -- Order by the learning languages of user1
`;


// current function:
// BEGIN
//     RETURN QUERY
//     SELECT
//     ui2.user_id AS user_id_2
//     FROM public.user_info ui1
//     JOIN public.user_info ui2
//     ON ui1.user_id = userId  -- Subject user ID (user 18)
//     AND ui1.user_id <> ui2.user_id
//     AND (
//     ui1.proficient_languages && ui2.learning_languages
//     AND ui1.learning_languages && ui2.proficient_languages
//     )
//     ORDER BY
//     ui2.proficient_languages, -- Order by the proficient languages of user2
//     ui2.learning_languages, -- Order by the learning languages of user2
//     ui1.proficient_languages, -- Order by the proficient languages of user1
//     ui1.learning_languages; -- Order by the learning languages of user1
// END;

module.exports = router;
