require('dotenv').config(); // 1. Load the secret variables from the .env file
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// 2. Use the secret variables instead of hardcoding them!
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Successfully connected to the MySQL Database!');
});

app.get('/', (req,res) => {
    res.send('Backend is running!');
});

app.get('/api/subjects', (req, res) => {
    const sql = "SELECT * FROM subjects";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching subjects:", err);
            return res.status(500).json({ error: "Failed to load subjects" });
        }
        res.json(results);
    });
});

// --- NEW TINY STEP: ADD DATA ---
app.post('/api/subjects', (req, res) => {
    const { title, description } = req.body; // Grab the data sent to us

    // The ? marks are security guards. They prevent "SQL Injection" hackers!
    const sql = "INSERT INTO subjects (title, description) VALUES (?, ?)";

    db.query(sql, [title, description], (err, result) => {
        if (err) {
            console.error("Error adding subject:", err);
            return res.status(500).json({ error: "Failed to add subject" });
        }
        res.status(201).json({ message: "Subject added to the database!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});