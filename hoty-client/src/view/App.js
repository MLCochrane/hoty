import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/global/header/Header';
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <section className="App">
          <Header />
          <main className="page-content">
            <Routes/>
          </main>
        </section>
      </Router>
    );
  }
}

export default App;
