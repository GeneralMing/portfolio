const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Serve the React frontend build if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  
  // Serve index.html for any other route (single-page application)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the backend API!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
