// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Backend running'));

app.use('/chat', chatRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
