import React, { useState } from 'react';
import { createAContact } from './coreapicalls';
const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactno: '',
  });
  const { name, email, contactno } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createAContact(formData);
  };

  return (
    <React.Fragment>
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
        <input type='submit' value='Add' />
      </form>
    </React.Fragment>
  );
};

export default Create;
