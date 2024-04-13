const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { Pool } = require('pg')


app.use(cors());
app.use(express.json());

/*
    *Creating A pool to connect with postgres
*/
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'HFDMS',
    password:'Passw0rd@123',
    port:5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Error in connecting to the database', err);
    } else {
        console.log('Connected to the database');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*
    *ADMIN APIS
*/
app.get('/api/admins', async (req, res) => {
    try {
       const result = await pool.query('SELECT AdminID, FullName FROM AdministrativeStaff');
       res.json(result.rows);
       //console.log(result.rows);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'An error occurred while fetching admins' });
    }
});

app.post('/api/admins/authenticate', async (req, res) => {
    const { AdminID, Pin } = req.body;
    try {
        const result = await pool.query('SELECT * FROM AdministrativeStaff WHERE AdminID = $1 AND Pin = $2', [AdminID, Pin]);
        if (result.rows.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, error: 'Invalid ID or PIN' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while authenticating' });
    }
});

/*
    *MEMBER APIS
*/
app.post('/api/signup', async (req, res) => {
    console.log('Request body:', req.body);
    const { fullName, username, pin } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO Members (FullName, username, pin) VALUES ($1, $2, $3)',
        [fullName, username, pin]
        );
        res.status(201).json({ message: 'Member signed up successfully' });
    } catch (error) {
        if (error.code === '23505') { // This is the error code for unique_violation in PostgreSQL
            res.status(400).json({ error: 'Username already exists' });
        } else {
            console.error('Error signing up:', error);
            res.status(500).json({ error: 'An error occurred while signing up' });
        }
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});