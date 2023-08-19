const express = require('express');
const router = express.Router();

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

// Create a new contact
router.post('/', (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  res.status(201).json(newContact);
  console.log(newContact);
});

// Get all contacts
router.get('/', (req, res) => {
  console.log("Contacts here");
  res.json(contacts);
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

module.exports = router;
