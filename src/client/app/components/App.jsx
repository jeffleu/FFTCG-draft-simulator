import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { createBox } from '../helper';

// Components
import DraftSimulator from './DraftSimulator';
import Home from './Home';
import Nav from './Nav';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
    }
  }

  componentWillMount() {
    axios.get('/getCardData')
      .then(response => this.setState({cards: response.data}))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div id="app">
        <Nav/>

        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/search" component={Search}/>
            <Route path="/draft" component={DraftSimulator}/>
          </div>
        </Router>

        <object type="image/svg+xml" data="https://loading.io/spinners/blocks/index.rotating-squares-preloader-gif.svg">
          Your browser does not support SVG.
        </object>
      </div>
    );
  }
}

export default App;
