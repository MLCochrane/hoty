import React, { Component } from 'react';

import Header from './components/global/header/Header';
import UserForm from './components/forms/UserForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <UserForm/>
      </div>
    );
  }
}

export default App;
