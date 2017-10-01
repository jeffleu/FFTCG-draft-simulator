import React, { Component } from 'react';

const CardList = (props) => {
  const { players, cardListPlayer, changeCardListPlayer } = props;

  let selectedCards;
  if (cardListPlayer === 1) {
    selectedCards = players.player1.selectedCards;
  } else if (cardListPlayer === 2) {
    selectedCards = players.player2.selectedCards;
  } else if (cardListPlayer === 3) {
    selectedCards = players.player3.selectedCards;
  } else if (cardListPlayer === 4) {
    selectedCards = players.player4.selectedCards;
  }

  const elementsAndTypes = selectedCards.reduce((output, card) => {
    !output[card.element] ? output[card.element] = 1 : output[card.element]++;
    !output[card.type] ? output[card.type] = 1 : output[card.type]++;
    return output;
  }, {});

  console.log('elements in card list', elementsAndTypes);

  const list = selectedCards.map((card, i) => {
    return (
      <li className={`card-list-${card.element.toLowerCase()}`} key={i}>{card.name}</li>
    );
  });

  return (
    <div id="card-list">
      <h1>Card List</h1>

      <div className="elements-and-types">
        <div>Fire: { elementsAndTypes['Fire'] || 0 }</div>
        <div>Ice: { elementsAndTypes['Ice'] || 0 }</div>
        <div>Earth: { elementsAndTypes['Earth'] || 0 }</div>
        <div>Wind: { elementsAndTypes['Wind'] || 0 }</div>
        <div>Lightning: { elementsAndTypes['Lightning'] || 0 }</div>
        <div>Water: { elementsAndTypes['Water'] || 0 }</div>
        <div>Light: { elementsAndTypes['Light'] || 0 }</div>
        <div>Dark: { elementsAndTypes['Dark'] || 0 }</div>
      </div>

      <button className="btn" onClick={() => changeCardListPlayer(1)}>Player 1</button>
      <button className="btn" onClick={() => changeCardListPlayer(2)}>Player 2</button>
      <button className="btn" onClick={() => changeCardListPlayer(3)}>Player 3</button>
      <button className="btn" onClick={() => changeCardListPlayer(4)}>Player 4</button>

      <ul>
        {list}
      </ul>
    </div>
  );
};

export default CardList;
