const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./ace.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS part_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    part_id INTEGER,
    manufacturing TEXT,
    physics TEXT,
    chemistry TEXT,
    mathematics TEXT
  )`);

  // Insert sample data if empty
  db.get('SELECT COUNT(*) as c FROM vehicles', (err, row) => {
    if (row.c === 0) {
      db.run(`INSERT INTO vehicles (name, category, description, image_url) 
        VALUES ('Royal Enfield Classic 350', 'Motorcycle', 
        'An iconic Indian motorcycle known for its classic design and thumping 349cc engine.',
        '/images/engine.jpg')`
      , function() {
        const vehicleId = this.lastID;

        const parts = [
          ['Piston & Cylinder', 'Engine', '/images/piston.jpg'],
          ['Spark Plug', 'Engine', '/images/spark-plug.jpg'],
          ['Crankshaft', 'Engine', '/images/crankshaft.jpg'],
          ['Camshaft & Valves', 'Engine', '/images/camshaft.jpg'],
          ['Carburetor', 'Engine', '/images/carburetor.jpg'],
          ['Chassis Frame', 'Chassis', '/images/frame.jpg'],
          ['Fuel Tank', 'Chassis', '/images/fuel-tank.jpg'],
          ['Battery', 'Electrical', '/images/battery.jpg'],
          ['Alternator', 'Electrical', '/images/alternator.jpg'],
          ['Wiring Harness', 'Electrical', '/images/wiring.jpg'],
          ['ECU', 'Electrical', '/images/ecu.jpg'],
          ['Suspension System', 'Suspension', '/images/suspension.jpg'],
          ['Front Disc Brake', 'Braking', '/images/front-brake.jpg'],
          ['Steering Assembly', 'Steering', '/images/steering.jpg'],
          ['Clutch Assembly', 'Transmission', '/images/clutch.jpg'],
          ['Gearbox', 'Transmission', '/images/gearbox.jpg'],
          ['Drive Chain', 'Transmission', '/images/chain.jpg'],
          ['Instrument Cluster', 'Instrumentation', '/images/instrument.jpg'],
          ['Rider Seat', 'Interior', '/images/seat.jpg'],
        ];

        parts.forEach(([name, category, image_url]) => {
          db.run(
            'INSERT INTO parts (vehicle_id, name, category, image_url) VALUES (?, ?, ?, ?)',
            [vehicleId, name, category, image_url],
            function() {
              const partId = this.lastID;
              db.run(
                'INSERT INTO part_details (part_id, manufacturing, physics, chemistry, mathematics) VALUES (?, ?, ?, ?, ?)',
                [partId,
                  `The ${name} is manufactured using precision engineering processes including casting, forging, and CNC machining to exact tolerances.`,
                  `The ${name} operates on fundamental physics principles including thermodynamics, mechanics, and electromagnetic induction.`,
                  `The ${name} is made from high-grade materials including alloy steel, aluminium alloys, and specialized compounds for durability.`,
                  `Mathematical formulas governing ${name} include force calculations, torque equations, and efficiency ratios used in engineering design.`
                ]
              );
            }
          );
        });
        console.log('Sample data inserted!');
      });
    }
  });
});

// API 1: Get all vehicles
app.get('/vehicles', (req, res) => {
  db.all('SELECT * FROM vehicles', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API 2: Get parts by vehicle
app.get('/vehicles/:id/parts', (req, res) => {
  db.all('SELECT * FROM parts WHERE vehicle_id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API 3: Get part detail
app.get('/parts/:id', (req, res) => {
  db.get('SELECT * FROM parts WHERE id = ?', [req.params.id], (err, part) => {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM part_details WHERE part_id = ?', [req.params.id], (err, detail) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ part, detail });
    });
  });
});

app.listen(PORT, () => {
  console.log(`ACE server is running at http://localhost:${PORT}`);
});