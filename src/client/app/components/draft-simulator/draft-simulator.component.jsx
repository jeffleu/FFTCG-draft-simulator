import React, { Component } from 'react';
import axios from 'axios';
import { createBox, aiPickCard } from './draft-simulator.helper';

// Components
import CardList from './card-list/card-list.component';
import CurrentPack from './current-pack/current-pack.component';

class DraftSimulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boxes: null,
      cards: [],
      cardListPlayer: 1,
      draftPacks: [],
      players: {
        player1: {currentPack: [], packs: [], selectedCards: []},
        player2: {currentPack: [], packs: [], selectedCards: []},
        player3: {currentPack: [], packs: [], selectedCards: []},
        player4: {currentPack: [], packs: [], selectedCards: []},
      },
      round: null,
    };

    this.changeCardListPlayer = this.changeCardListPlayer.bind(this);
    this.selectCard = this.selectCard.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({cards: newProps.cards});
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
      player1: {currentPack: [], packs: [], selectedCards: []},
      player2: {currentPack: [], packs: [], selectedCards: []},
      player3: {currentPack: [], packs: [], selectedCards: []},
      player4: {currentPack: [], packs: [], selectedCards: []},
    };

    // Get packs from boxes depending on which Opus was selected
    this.state.draftPacks.forEach(pack => {
      let opusBox;
      if (pack === 1) {
        opusBox = boxes.opus1;
      } else if (pack === 2) {
        opusBox = boxes.opus2;
      } else if (pack === 3) {
        opusBox = boxes.opus3;
      }

      if (!players.player1.currentPack.length) {
        players.player1.currentPack = opusBox.shift();
        players.player2.currentPack = opusBox.shift();
        players.player3.currentPack = opusBox.shift();
        players.player4.currentPack = opusBox.shift();
      } else {
        players.player1.packs.push(opusBox.shift());
        players.player2.packs.push(opusBox.shift());
        players.player3.packs.push(opusBox.shift());
        players.player4.packs.push(opusBox.shift());
      }
    });

    this.setState({
      boxes,
      round: 1,
      players,
      draftPacks: [],
    });
  }

  selectCard(cardIndex) {
    const { players } = this.state;

    // Add selected card to the selectedCards array for each player
    const selectedCard = players.player1.currentPack.splice(cardIndex, 1)[0];
    players.player1.selectedCards.push(selectedCard);
    const player2 = aiPickCard(players.player2.currentPack, players.player2.selectedCards);
    const player3 = aiPickCard(players.player3.currentPack, players.player3.selectedCards);
    const player4 = aiPickCard(players.player4.currentPack, players.player4.selectedCards);

    const player1CurrentPackCopy = players.player1.currentPack;
    if (this.state.round % 2 === 0) {
      players.player1.currentPack = players.player2.currentPack;
      players.player2.currentPack = players.player3.currentPack;
      players.player3.currentPack = players.player4.currentPack;
      players.player4.currentPack = player1CurrentPackCopy;
    } else {
      players.player1.currentPack = players.player4.currentPack;
      players.player4.currentPack = players.player3.currentPack;
      players.player3.currentPack = players.player2.currentPack;
      players.player2.currentPack = player1CurrentPackCopy;
    }

    this.setState({ players });
  }

  openNextPack() {
    const { players } = this.state;

    players.player1.currentPack = players.player1.packs.shift();
    players.player2.currentPack = players.player2.packs.shift();
    players.player3.currentPack = players.player3.packs.shift();
    players.player4.currentPack = players.player4.packs.shift();

    this.setState({ players });
  }

  changeCardListPlayer(player) {
    this.setState({ cardListPlayer: player });
  }

  render() {
    return (
      <div id="draft-simulator">
        <h1>Draft Simulator</h1>

        draft packs: {this.state.draftPacks}

        <div id="draft-simulator-content">
          <div className="buttons">
            {
              this.state.draftPacks.length !== 4
                ? <div className="add-pack-buttons">
                    <button className="btn" onClick={() => this.addToDraftPacks(1)}>Add Opus 1</button>
                    <button className="btn" onClick={() => this.addToDraftPacks(2)}>Add Opus 2</button>
                    <button className="btn" onClick={() => this.addToDraftPacks(3)}>Add Opus 3</button>
                  </div>
                : <button className="btn" onClick={() => this.startDraft()}>Start Draft</button>
            }

            {
              this.state.players.player1.currentPack.length === 0 && this.state.players.player1.packs.length > 0
                ? <button className="btn" onClick={() => this.openNextPack()}>Open Next Pack</button>
                : null
            }
          </div>
        </div>

        <CurrentPack currentPack={this.state.players.player1.currentPack} selectCard={this.selectCard}/>
        <CardList players={this.state.players} cardListPlayer={this.state.cardListPlayer} changeCardListPlayer={this.changeCardListPlayer}/>

      </div>
    );
  }
}

export default DraftSimulator;
