const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.status(200).send('Amazon Clone API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
