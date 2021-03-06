import React, { useState, useEffect } from 'react';
import { getAContact, updateAContact } from './coreapicalls';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Update = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactno: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { name, email, contactno } = formData;
  const preload = (Id) => {
    getAContact(Id).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setFormData(data);
      }
    });
  };
  useEffect(() => {
    preload(match.params.id);
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    updateAContact(match.params.id, formData).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setFormData({ ...formData, name: '', email: '', contactno: '' });
      }
    });
  };
  const successMessage = () => {
    if (success) {
      return <h4>Contact Updated successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4> Failed to update contact, Please use other Name</h4>;
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

          <button>Update Contact</button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default Update;
