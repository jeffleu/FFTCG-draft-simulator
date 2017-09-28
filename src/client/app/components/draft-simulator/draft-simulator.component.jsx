import React, { Component } from 'react';
import axios from 'axios';
import { createBox, pickCard } from './draft-simulator.helper';

class DraftSimulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],

      box: [], // remove?

      draftPacks: [],
      round: null,
      players: {
        player1: null,
        player2: null,
        player3: null,
        player4: null,
      },

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

  addToDraftPacks(opus) {
    if (this.state.draftPacks.length < 4) {
      this.setState({ draftPacks: this.state.draftPacks.concat(opus) });
    }
  }

  startDraft() {
    // Create all 3 Opus boxes
    const boxes = {
      opus1: createBox(this.state.cards, 1),
      opus2: createBox(this.state.cards, 2),
      opus3: createBox(this.state.cards, 3),
    };

    // Set up default players object
    const players = {
      player1: {currentPack: [], packs: [], hand: []},
      player2: {currentPack: [], packs: [], hand: []},
      player3: {currentPack: [], packs: [], hand: []},
      player4: {currentPack: [], packs: [], hand: []},
    };

    this.setState({
      round: 1,
      players,
      draftPacks: [], // empty out draft packs
    });
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

        draft packs: {this.state.draftPacks}

        <div>
          <button className="btn" onClick={() => this.getBox(1)}>Opus 1</button>
          <button className="btn" onClick={() => this.getBox(2)}>Opus 2</button>
          <button className="btn" onClick={() => this.getBox(3)}>Opus 3</button>

          <button className="btn" onClick={() => this.addToDraftPacks(1)}>Add Opus 1</button>
          <button className="btn" onClick={() => this.addToDraftPacks(2)}>Add Opus 2</button>
          <button className="btn" onClick={() => this.addToDraftPacks(3)}>Add Opus 3</button>

          <button className="btn" onClick={() => this.selectCard()}>Select Card</button>
          <button className="btn" onClick={() => this.startDraft()}>Start Draft</button>
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
