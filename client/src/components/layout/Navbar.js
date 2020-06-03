import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <React.Fragment>
      <Link to='/create'>Create A Contact</Link>
    </React.Fragment>
  );
};
export default Navbar;
