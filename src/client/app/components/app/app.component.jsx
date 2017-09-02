import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

// Components
import DraftSimulator from '../draft-simulator/draft-simulator.component';
import Home from '../home/home.component';
import Nav from '../nav/nav.component';
import Search from '../search/search.component';

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
            <Route path="/draft" render={ () => <DraftSimulator cards={this.state.cards}/> }/>
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
