const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactno: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = Contact = mongoose.model('Contact', ContactSchema);
