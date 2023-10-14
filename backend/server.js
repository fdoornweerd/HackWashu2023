const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const supabaseConfig = require('./supabaseConfig');

const app = express();
const port = process.env.PORT || 3000;

// Initialize the Supabase client
const supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);

// Load and use your API routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes); // Mount the API routes under '/api'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
