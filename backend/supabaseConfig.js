const { createClient } = require('@supabase/supabase-js')

// Initialize the Supabase client with your Supabase credentials
const supabase = createClient('https://cwzyrwjheixqeyssdkyq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3enlyd2poZWl4cWV5c3Nka3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMDQyNjMsImV4cCI6MjAxMjg4MDI2M30.fDq7GbnkBNNt-h1udojYVeagFCOlmJWG4sEuMNLvub4')

module.exports = supabase
