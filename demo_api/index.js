const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'duchinh',
  password: '231132',
  database: 'express_api'
});

db.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  };
  console.log("Successfully connected to the database");
});

app.use(express.urlencoded({
  extended: true,
}));

app.get('/api/users', (_request, response) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      response.status(500).json({ err: err.message });
      return;
    };
    response.json(results);
  });
});

app.get('/api/user/:id', (request, response) => {
  db.query('SELECT * FROM user WHERE id = ?', [request.params.id], (err, results) => {
    if (err) {
      response.status(500).json({ err: err.message });
      return;
    };
    if (results.length == 0) {
      response.status(404).json({ message: 'User not found' });
      return;
    };
    response.json(results[0]);
  });
});

app.post('/api/user/', (request, response) => {
  const { username, age, city } = request.body;
  db.query('INSERT INTO user (username, age, city) VALUES (?,?,?)', [username, age, city], (err, result) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    };
    response.status(201).json({
      message: "User created successfully",
      id: result.insertId
    });
  });
});

app.put('/api/user/:id', (request, response) => {
  const { username, age, city } = request.body;
  db.query('UPDATE user SET username = ?, age = ?, city = ? WHERE id = ?', [username, age, city, request.params.id], (err, result) => {
    if (err) {
      response.status(500).json({ err: err.message });
      return;
    };
    if (result.affectedRows === 0) {
      response.status(404).json({ message: 'User not found' });
      return;
    };
    response.json({ message: 'Updated successfully' });
  });
});

app.delete('/api/user/:id', (request, response) => {
  db.query('DELETE FROM user where id = ?', [request.params.id], (err, result) => {
    if (err) {
      response.status(500).json({ err: err.message });
      return;
    };
    if (result.affectedRows === 0) {
      response.status(404).json({ message: 'Item not found' });
      return;
    };
    response.json({ message: 'Deleted successfully' });
  });
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
