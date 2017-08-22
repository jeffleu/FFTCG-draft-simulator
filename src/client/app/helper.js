import {
  commonsPerPack,
  heroesPerBox,
  legendsPerBox,
  raresPerPack,
} from './constants';

// Get Opus from card's serial number
const getOpus = card => Number(card.serial_number.split('-')[0]);

// Shuffle cards
const shuffleCards = cards => {
  for (let i = 0; i < cards.length; i++) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }

  return cards;
};

// Filters all card data by Opus
const filterByOpus = (cards, opus) => cards.filter(card => opus === getOpus(card));

// Filters all card data by Rarity
const filterByRarity = (cards, rarity) => cards.filter(card => rarity === card.rarity);

// Get certain amount of randomized cards by rarity
const getRandomizedAmount = (opusCards, rarity, amount) => {
  const filtered = filterByRarity(opusCards, rarity);
  const shuffled = shuffleCards(filtered);
  return shuffled.slice(0, amount);
};

// Get random card from Opus (for foil)
const getFoil = (opusCards) => {
  const randomIndex = Math.floor(Math.random() * opusCards.length);
  return opusCards[randomIndex];
};

// Create a box based on Opus
const createBox = (cards, opus) => {
  const opusCards = filterByOpus(cards, opus);
  const packs = [];

  const legends = getRandomizedAmount(opusCards, 'Legend', legendsPerBox);
  const heroes = getRandomizedAmount(opusCards, 'Hero', heroesPerBox);
  const legendsAndHeroes = shuffleCards([...legends, ...heroes]);

  while(legendsAndHeroes.length) {
    const rareCard = legendsAndHeroes.shift();
    packs.push(createPack(opusCards, rareCard));
  }

  console.log('box', packs);
  return packs;
};

const createPack = (opusCards, rareCard) => {
  const commons = getRandomizedAmount(opusCards, 'Common', commonsPerPack);
  const foil = getFoil(opusCards);
  const rares = getRandomizedAmount(opusCards, 'Rare', raresPerPack);
  return [...commons, foil, ...rares, rareCard];
};

export {
  createBox,
  createPack,
  filterByOpus,
  filterByRarity,
  getFoil,
  getOpus,
  getRandomizedAmount,
  shuffleCards,
};
