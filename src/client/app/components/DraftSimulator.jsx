import React, { Component } from 'react';
import axios from 'axios';
import { createBox } from '../helper';

class DraftSimulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      box: [],
    };

    this.getBox = this.getBox.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({cards: newProps.cards});
  }

  getBox(opus) {
    const box = createBox(this.state.cards, opus);
    this.setState({box});
  }

  render() {
    let packDisplay;

    if (this.state.box.length) {
      packDisplay = this.state.box[0].map((pack, i) => {
        return <img className="card" src={pack.image} key={i}/>
      });
    }

    return (
      <div id="draft-simulator">
        <h1>Draft Simulator</h1>

        <div>
          <button className="btn" onClick={() => this.getBox(1)}>Opus 1</button>
          <button className="btn" onClick={() => this.getBox(2)}>Opus 2</button>
          <button className="btn" onClick={() => this.getBox(3)}>Opus 3</button>
        </div>
        <span>
          {packDisplay}
        </span>

      </div>
    );
  }
}

export default DraftSimulator;
