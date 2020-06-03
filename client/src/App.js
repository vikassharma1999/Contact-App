import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/core/Main';
import Create from './components/core/Create';
import Navbar from './components/layout/Navbar';
import Update from './components/core/Update';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/create' exact component={Create} />
        <Route path='/update/:id' exact component={Update} />
      </Switch>
    </Router>
  );
}

export default App;
