const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection to the MariaDB database
const db = mysql.createConnection({
    host: 'mariadb-container', // The name of the MariaDB container
    user: 'root',
    password: 'my-secret-pw',
    database: 'mydatabase'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MariaDB database');
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM mytable'; // Replace 'mytable' with your table name
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
