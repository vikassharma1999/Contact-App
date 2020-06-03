import React, { useState } from 'react';
import { createAContact } from './coreapicalls';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactno: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { name, email, contactno } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    createAContact(formData)
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setFormData({ ...formData, name: '', email: '', contactno: '' });
          setError(false);
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const successMessage = () => {
    if (success) {
      return <h4>Contact created successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4>Failed to create contact, Please use other Name</h4>;
    }
  };

  return (
    <React.Fragment>
      <div style={{ padding: 10 }}>
        <Button type='primary'>
          <Link to='/'>Back</Link>
        </Button>
      </div>
      <div style={{ padding: 10 }}>
        {successMessage()}
        {errorMessage()}
      </div>
      <form onSubmit={(e) => onSubmit(e)} className='create-contact-form'>
        <div className='create-contact-details'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={(e) => onChange(e)}
            value={name}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={(e) => onChange(e)}
            value={email}
            required
          />
          <input
            type='text'
            name='contactno'
            placeholder='Enter 10 digit number here'
            onChange={(e) => onChange(e)}
            value={contactno}
            required
            minLength='10'
            maxLength='10'
          />

          <button>Add Contact</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Create;
