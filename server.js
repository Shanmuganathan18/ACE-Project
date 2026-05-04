const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API 1: Get all vehicles
app.get('/vehicles', (req, res) => {
  const vehicles = db.prepare('SELECT * FROM vehicles').all();
  res.json(vehicles);
});

// API 2: Get all parts for a specific vehicle
app.get('/vehicles/:id/parts', (req, res) => {
  const parts = db.prepare(
    'SELECT * FROM parts WHERE vehicle_id = ?'
  ).all(req.params.id);
  res.json(parts);
});

// API 3: Get full detail of one part
app.get('/parts/:id', (req, res) => {
  const part = db.prepare('SELECT * FROM parts WHERE id = ?').get(req.params.id);
  const detail = db.prepare('SELECT * FROM part_details WHERE part_id = ?').get(req.params.id);
  res.json({ part, detail });
});

// Start the server
app.listen(PORT, () => {
  console.log(`ACE server is running at http://localhost:${PORT}`);
});