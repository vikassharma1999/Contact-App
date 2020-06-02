const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @API END POINT POST /api/contact/
// @DESC api for create a contact
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('contactno', 'Please Enter 10 digit contact number').isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, contactno } = req.body;
    try {
      let contact = await Contact.findOne({ name });
      if (contact) {
        return res
          .status(400)
          .json({ msg: 'Name is already exists, Please use other name' });
      }
      const newContact = {
        name,
        email,
        contactno,
      };
      contact = await new Contact(newContact);
      await contact.save();
      return res.json(contact);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @API END POINT GET /api/contact/
// @DESC api for get all contacts
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  if (!contacts) {
    return res.status(400).json({ msg: 'No Contact Found' });
  }
  return res.json(contacts);
});

// @API END POINT PUT /api/contact/:id
// @DESC api for update a contact
router.put('/:id', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    const { name, email, contactno } = req.body;

    if (!contact) {
      return res.status(400).json({ msg: 'Contact Not Found' });
    }
    contact.name = name;
    contact.email = email;
    contact.contactno = contactno;
    await contact.save();
    return res.json(contact);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @API END POINT DELETE /api/contact/:id
// @DESC api for delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(400).json({ msg: 'Contact Not Found' });
    }
    await contact.remove();
    return res.send('Contact Successfully removed');
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
module.exports = router;
