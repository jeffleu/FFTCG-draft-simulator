import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { createBox } from '../helper';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: null,
      randomImgSrc: null,
    };

    this.getBox = this.getBox.bind(this);
  }

  componentWillMount() {
    axios.get('/getCardData')
      .then(response => this.setState({cards: response.data}))
      .catch(error => console.log('error', error));
  }

  getBox() {
    const box = createBox(this.state.cards, 3);
    this.setState({box});
  }

  render() {
    let packDisplay;

    if (this.state.box) {
      packDisplay = this.state.box[0].map((pack, i) => {
        return <img className="card" src={pack.image} key={i}/>
      });
    }

    return (
      <div>
        <p>Hello, Reacts!</p>
        <div>
          <button className="btn" onClick={this.getBox}>Get Box</button>
        </div>
        <span>
          {packDisplay}
        </span>
      </div>
    );
  }
}
