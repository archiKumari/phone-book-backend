const express = require('express');
const router = express.Router();

const pool = require('../db');

// Get all contacts
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM contacts');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new contact
router.post('/', async (req, res, next) => {
  const { name, phone, email } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO contacts (name, phone, email) VALUES ($1, $2, $3) RETURNING *', [name, phone, email]);
    res.status(201).json(rows[0]);
    console.log("Contact added!");
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a contact
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  try {
    const { rows } = await pool.query('UPDATE contacts SET name=$1, phone=$2, email=$3 WHERE id=$4 RETURNING *', [name, phone, email, id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a contact
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM contacts WHERE id=$1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
