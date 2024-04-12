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

app.get('/members', async (req, res) => {
    try {
       const result = await pool.query('SELECT * FROM Trainers');
       res.json(result.rows);
       //console.log(result.rows);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'An error occurred while fetching members', details: err.message });
    }
   });



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});