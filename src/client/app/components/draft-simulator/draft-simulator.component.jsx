import React, { Component } from 'react';
import axios from 'axios';
import { createBox, pickCard } from './draft-simulator.helper';

class DraftSimulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      box: [],

      pack: [], // remove
      selected: [], // remove
    };

    this.getBox = this.getBox.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({cards: newProps.cards});
  }

  getBox(opus) {
    const box = createBox(this.state.cards, opus);
    // this.setState({box});

    // to remove, just using this to visually see pack getting smaller
    const pack = box[0];
    this.setState({box, pack});
  }

  selectCard() {
    pickCard(this.state.pack, this.state.selected);
    this.setState({pack: this.state.pack, selected: this.state.selected});
  }

  render() {
    let packDisplay;

    if (this.state.pack.length) {
      packDisplay = this.state.pack.map((pack, i) => {
        return <img className="card" src={pack.image} key={i}/>
      });
    }

    let selectedDisplay;

    if (this.state.selected.length) {
      selectedDisplay = this.state.selected.map((card, i) => {
        return <img className="card" src={card.image} key={i}/>
      });
    }

    return (
      <div id="draft-simulator">
        <h1>Draft Simulator</h1>

        <div>
          <button className="btn" onClick={() => this.getBox(1)}>Opus 1</button>
          <button className="btn" onClick={() => this.getBox(2)}>Opus 2</button>
          <button className="btn" onClick={() => this.getBox(3)}>Opus 3</button>
          <button className="btn" onClick={() => this.selectCard()}>Select Card</button>
        </div>
        <span>
          {packDisplay}
        </span>
        <h1>Selected {this.state.selected.length}</h1>
        <span>
          {selectedDisplay}
        </span>

      </div>
    );
  }
}

export default DraftSimulator;
