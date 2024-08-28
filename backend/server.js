// backend/server.js
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
require('dotenv').config();

const countryRoutes = require("./routes/Countries")

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api', countryRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
