import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { filterByOpusAndRarity } from '../helper';
import { cardDataApi } from '../constants';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: null,
      randomImgSrc: null,
    };

    this.getRandomCard = this.getRandomCard.bind(this);
  }

  componentWillMount() {
    axios.get('/getCardData')
      .then(response => {
        this.setState({cards: response.data});
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  getRandomCard() {
    const opus1Legends = filterByOpusAndRarity(this.state.cards, 3, 'Hero');
    console.log('opus1Legends', opus1Legends);
    const randomIndex = Math.floor(Math.random() * opus1Legends.length);
    console.log('card', opus1Legends[randomIndex]);
    this.setState({
      randomImgSrc: opus1Legends[randomIndex].image,
    });
  }

  render() {
    return (
      <div>
        <p>Hello, Reacts!</p>
        <div>
          <button className="btn" onClick={this.getRandomCard}>Open Pack</button>
        </div>
        <div>
          <img className="card" src={this.state.randomImgSrc}/>
        </div>
      </div>
    );
  }
}
