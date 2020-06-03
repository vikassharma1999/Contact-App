import API from '../../backend';

// method for get all contacts
export const getAllContact = () => {
  return fetch(`${API}/contact`, {
    method: 'GET',
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .catch((err) => console.log(err));
};

//method for get a contact
export const getAContact = (id) => {
  return fetch(`${API}/contact/${id}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// method to create a contact
export const createAContact = (contactData) => {
  return fetch(`${API}/contact`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// method to update a contact
export const updateAContact = (id, contactData) => {
  return fetch(`${API}/contact/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// method to delete a contact
export const deleteAContact = (id) => {
  return fetch(`${API}/contact/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
