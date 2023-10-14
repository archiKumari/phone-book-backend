const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// In-memory storage for contacts (replace this with a database)
let contacts = [
  {
      "name": "Archi Kumari",
      "contactNumber": "07991163323",
      "email": "archikumari97@gmail.com",
      "id": 16
  },
  {
      "name": "raj",
      "contactNumber": "9876534567",
      "email": "raj@gmail.com",
      "id": 17
  },
  {
      "name": "Apurva",
      "contactNumber": "8678998767",
      "email": "apurva@gmail.com",
      "id": 18
  },
  {
      "name": "Ami Kumari",
      "contactNumber": "83476543456",
      "email": "ami@gmail.com",
      "id": 19
  },
];

const pool = new Pool({
  user: 'archi',
  host: 'localhost',
  database: 'phonebook',
  password: '123',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database at', res.rows[0].now);
  }
});

// Create a new contact
router.post('/', (req, res) => {
  const contact = req.body;
  const addedContact = insertNewContact(contact);
  res.status(201).json(addedContact);
});

// Get all contacts
// router.get('/', async(req, res) => {
//   const allContacts = await getAllContacts();
//   console.log("Fetched contacts",allContacts);
//   res.json(allContacts);
// });

router.get('/', (req, res) => {
  const allContacts = getAllContacts()
  console.log("Fetched contacts",allContacts);
  res.json(allContacts);
});

// Get a specific contact by ID
router.get('/:id', (req, res) => {
  const contactId = req.params.id;
  console.log(contactId);
  const contact = contacts.find(contact => contact.id == contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Update a contact by ID
router.put('/:id', (req, res) => {
  const contactId = req.params.id;
  const updatedContact = req.body;
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = updatedContact;
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Delete a contact by ID
router.delete('/:id', (req, res) => {
  const contactId = req.params.id;
  contacts = contacts.filter(contact => contact.id !== contactId);
  res.status(204).end();
});

//Database functions
function insertNewContact ({name,contactNumber,email}) {
pool.query('INSERT INTO contacts (name, phone_number, email) VALUES ($1, $2, $3) RETURNING *', [name, contactNumber, email], (err, res) => {
  if (err) {
    console.error('Error inserting contact:', err);
  } else {
    console.log('Contact inserted successfully:');
  }
  return res.rows[0]
});
}

function getAllContacts () {
  pool.query('SELECT * from contacts', (err, res) => {
  if (err) {
    console.error('Error inserting contact:', err);
  } else {
    console.log('Fetched all contacts',res.rows);
  }
  return (res.rows);
});
}

module.exports = router;