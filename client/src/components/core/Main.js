import React, { useEffect, useState } from 'react';
import { getAllContact, deleteAContact } from './coreapicalls';
import { Link } from 'react-router-dom';

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(false);
  const loadAllContacts = () => {
    getAllContact().then((data) => {
      if (data.error) {
        setError(error);
      } else {
        setContacts(data);
      }
    });
  };
  useEffect(() => {
    loadAllContacts();
  }, []);
  const deleteContact = (id) => {
    deleteAContact(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        loadAllContacts();
      }
    });
  };

  return (
    <React.Fragment>
      <h1>List of all contacts</h1>
      {contacts.map((contact) => {
        return (
          <div key={contact._id}>
            <h1>Name: {contact.name}</h1>
            <h2>Email: {contact.email}</h2>
            <h3>Contact No: {contact.contactno}</h3>
            <button onClick={(e) => deleteContact(contact._id)}>Delete</button>
            <Link to={`/update/${contact._id}`}>Update</Link>
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default Main;
