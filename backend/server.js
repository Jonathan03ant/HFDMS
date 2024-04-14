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
    const { fullName, username, pin } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO Members (FullName, username, pin) VALUES ($1, $2, $3) RETURNING MemberID',
        [fullName, username, pin]
        );
        const memberId = result.rows[0].memberid;
        //console.log(memberId);
        res.status(201).json({ message: 'Member signed up successfully', memberId });
    } catch (error) {
        if (error.code === '23505') { 
            res.status(400).json({ error: 'Username already exists' });
        } else {
            console.error('Error signing up:', error);
            res.status(500).json({ error: 'An error occurred while signing up' });
        }
    }
});

app.post('/api/healthmetrics-pop', async (req, res) => {
    //console.log(req.body);
    const { currentWeight, goalWeight, height, memberId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO HealthMetrics (currentWeight, goalWeight, height) VALUES ($1, $2, $3) RETURNING HealthMetricsID',
            [currentWeight, goalWeight, height]
        );
        const healthMetricsId = result.rows[0].healthmetricsid;
    
        // Update the user's profile with the HealthMetricsID
        await pool.query(
            'UPDATE Members SET HealthMetricsID = $1 WHERE MemberID = $2',
            [healthMetricsId, memberId]
        );
    
        res.status(201).json({ message: 'Health metrics submitted successfully', healthMetricsId });
    } catch (error) {
    console.error('Error submitting health metrics:', error);
    res.status(500).json({ error: 'An error occurred while submitting health metrics' });
    }
});

app.post('/api/submitPayment', async (req, res) => {
    const { memberId, amount, dueDate } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Bills (MemberID, Amount, DueDate, PAID) VALUES ($1, $2, TO_DATE($3, \'YYYY-MM-DD\'), TRUE) RETURNING BillID',
            [memberId, amount, dueDate]
        );
        const billId = result.rows[0].billid;
        res.status(201).json({ message: 'Payment submitted successfully', billId });
    } catch (error) {
        console.error('Error submitting payment:', error);
        res.status(500).json({ error: 'An error occurred while submitting payment' });
    }
});

app.post('/api/members/authenticate', async (req, res) => {
    const { username, pin } = req.body;
    try {
        const result = await pool.query(
            'SELECT MemberID FROM Members WHERE Username = $1 AND PIN = $2',
            [username, pin]
        );
        if (result.rows.length > 0) {
            const memberId = result.rows[0].memberid;
            res.status(200).json({ success: true, memberId });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or PIN' });
        }
    } catch (error) {
        console.error('Error authenticating:', error);
        res.status(500).json({ error: 'An error occurred while authenticating' });
    }
});

app.get('/api/availability', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM Availability'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'An error occurred while fetching availability' });
    }
});

app.post('/api/schedule', async (req, res) => {
    //console.log(req.body);
    const { availabilityId, memberId, trainerId } = req.body;
    try {
        // Begin a transaction
        await pool.query('BEGIN');

        // Update the availability
        await pool.query(
            'UPDATE Availability SET available = false WHERE availabilityid = $1',
            [availabilityId]
        );

        // Insert a new schedule
        await pool.query(
            'INSERT INTO Schedules (MemberID, TrainerID, ScheduleStatus) VALUES ($1, $2, $3)',
            [memberId, trainerId, 'Scheduled']
        );

        // Commit the transaction
        await pool.query('COMMIT');

        res.status(200).json({ message: 'Schedule created successfully' });
    } catch (error) {
        // Rollback the transaction in case of error
        await pool.query('ROLLBACK');
        console.error('Error scheduling:', error);
        res.status(500).json({ error: 'An error occurred while scheduling' });
    }
})

app.get('/api/schedules/:memberId', async (req, res) => {
    try {
        const { memberId } = req.params;
        if (!memberId) {
            return res.status(400).json({ error: 'No memberId provided' });
        }
        const result = await pool.query(
            'SELECT * FROM Schedules WHERE memberId = $1', [memberId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No schedules found for this member' });
        }
        //console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(`Error fetching schedules for member ${memberId}:`, error);
        res.status(500).json({ error: 'An error occurred while fetching schedules' });
    }
});

app.get('/api/bills', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Bills');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ error: 'An error occurred while fetching bills' });
    }
});

app.get('/api/equipment', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Equipment');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching equipment:', error);
        res.status(500).json({ error: 'An error occurred while fetching equipment' });
    }
});

app.post('/api/equipment', async (req, res) => {
    console.log(req.body);
    try {
        const { name, status, notes } = req.body;
        const newEquipment = await pool.query(
            'INSERT INTO Equipment (name, status, notes) VALUES ($1, $2, $3) RETURNING *',
            [name, status, notes]
        );
        res.json(newEquipment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'An error occurred while adding equipment' });
    }
});

app.get('/api/schedules', async (req, res) => {
    //console.log(req.body)
    try {
        const result = await pool.query('SELECT * FROM Schedules');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'An error occurred while fetching schedules' });
    }
});

app.post('/api/schedules/:id/confirm', async (req, res) => {
    const { bookingId, status } = req.body;
    const { id } = req.params;

    try {
        await pool.query('UPDATE Schedules SET bookingid = $1, schedulestatus = $2 WHERE scheduleid = $3', [bookingId, status, id]);
        res.status(200).json({ message: 'Schedule confirmed' });
    } catch (error) {
        console.error('Error confirming schedule:', error);
        res.status(500).json({ error: 'An error occurred while confirming the schedule' });
    }
});

app.get('/api/metrics/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT hm.* FROM HealthMetrics hm JOIN Members m ON hm.HealthMetricsID = m.HealthMetricsID WHERE m.MemberID = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'An error occurred while fetching metrics' });
    }
});

app.put('/api/metrics/:id', async (req, res) => {
    const { id } = req.params;
    const { currentweight, goalweight, height } = req.body;

    try {
        await pool.query('UPDATE HealthMetrics SET CurrentWeight = $1, GoalWeight = $2, Height = $3 WHERE HealthMetricsID = $4', [currentweight, goalweight, height, id]);
        res.status(200).json({ message: 'Metrics updated successfully' });
    } catch (error) {
        console.error('Error updating metrics:', error);
        res.status(500).json({ error: 'An error occurred while updating metrics' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});