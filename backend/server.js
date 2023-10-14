const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const supabaseConfig = require('./supabaseConfig');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Initialize the Supabase client
const supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);

// Load and use your API routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes); // Mount the API routes under '/api'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
