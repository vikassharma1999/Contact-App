import React, { useState, useEffect } from 'react';
import { getAContact, updateAContact } from './coreapicalls';

const Update = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactno: '',
  });
  const [error, setError] = useState(false);
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
    updateAContact(match.params.id, formData).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log('Success');
      }
    });
  };
  return (
    <React.Fragment>
      Update
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          name='name'
          placeholder='Enter Name here:-'
          onChange={(e) => onChange(e)}
          value={name}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Enter Email here:-'
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
        <input type='submit' value='Update' />
      </form>
    </React.Fragment>
  );
};
export default Update;
