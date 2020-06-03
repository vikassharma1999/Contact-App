import React, { useEffect, useState } from 'react';
import { getAllContact, deleteAContact } from './coreapicalls';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Card } from 'antd';

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
      <div style={{ padding: 10 }}>
        <Button type='primary'>
          <Link to='/create'>Add Contact</Link>
        </Button>
      </div>

      {contacts.map((contact) => {
        return (
          <div
            key={contact._id}
            style={{
              padding: 10,
              justifyContent: 'center',
            }}
          >
            <Card
              size='small'
              title={contact.name}
              extra={<Link to={`/update/${contact._id}`}>Update</Link>}
            >
              <p>Email: {contact.email}</p>
              <p>Contact No: {contact.contactno}</p>
              <Button
                type='primary'
                danger
                onClick={(e) => deleteContact(contact._id)}
              >
                Delete
              </Button>
            </Card>
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default Main;
