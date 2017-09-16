import _ from 'lodash';

import {
  commonsPerPack,
  heroesPerBox,
  legendsPerBox,
  raresPerPack,
} from '../../constants';

/*************************************************
   Create box helper functions
 *************************************************/

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

  return packs;
};

// Create a pack of cards given a random Hero or Legend card
const createPack = (opusCards, rareCard) => {
  const commons = getRandomizedAmount(opusCards, 'Common', commonsPerPack);
  const foil = getFoil(opusCards);
  const rares = getRandomizedAmount(opusCards, 'Rare', raresPerPack);
  return [...commons, foil, ...rares, rareCard];
};

/*************************************************
   AI helper functions
 *************************************************/

// Selects strongest forward given element set
const getForward = (pack, playerElements) => {
  // Forwards sorted by power in descending order
  const forwards = _.remove(pack, card => card.type === 'Forward').sort((a, b) => b.power - a.power);

  let selectedForward;

  // Loop through forwards and get highest power forward with matching element
  for (let i = 0; i < forwards.length; i++) {
    const forward = forwards[i];

    if (playerElements.has(forward.element)) {
      selectedForward = forwards.splice(i, 1)[0];
      break;
    }
  }

  // If no forwards found for elements, grab highest power forward
  if (!selectedForward) {
    selectedForward = forwards.shift();
  }

  // Add remaining forwards back to pack
  forwards.forEach(forward => pack.push(forward));

  return selectedForward;
};

// Selects backup given element set
const getBackup = (pack, playerElements) => {
  const backups = _.remove(pack, card => card.type === 'Backup');

  let selectedBackup;

  // Loop through backups and get backup with matching element
  for (let i = 0; i < backups.length; i++) {
    const backup = backups[i];

    if (playerElements.has(backup.element)) {
      selectedBackup = backups.splice(i, 1)[0];
      break;
    }
  }

  // If no backups found for elements, grab random backup
  if (!selectedBackup) {
    selectedBackup = backups.shift();
  }

  // Add remaining forwards back to pack
  backups.forEach(backup => pack.push(backup));

  return selectedBackup;
};

// Picks a card from the pack
const pickCard = (pack, playerCards) => {
  // Draft maximum 12 backups

  console.log('pack before picking card', pack);

  const playerElements = new Set(playerCards.map((card) => card.element));

  const hasLegend = filterByRarity(pack, 'Legend')[0];
  const hasHero = filterByRarity(pack, 'Hero')[0];

  // Select card from pack
  let selectedCard;

  if (hasLegend) {
    const legends = _.remove(pack, (card) => card.rarity === 'Legend');
    selectedCard = legends.shift();
    if (legends.length) pack.push(legends.shift());
  } else if (hasHero) {
    const heroes = _.remove(pack, (card) => card.rarity === 'Hero');
    selectedCard = heroes.shift();
    if (heroes.length) pack.push(heroes.shift());
  } else {
    // Need to check if there are forwards
      // If there are forwards, run getForward
      // If there are backups, run getBackup
      // If there are summons, run getSummons
    // selectedCard = getForward(pack, playerElements);
    selectedCard = getBackup(pack, playerElements);
  }

  console.log('selectedCard', selectedCard);
  console.log('pack after picking card', pack);

  playerCards.push(selectedCard);

  return {selectedCard, pack};
};

export {
  createBox,
  createPack,
  filterByOpus,
  filterByRarity,
  getFoil,
  getOpus,
  getRandomizedAmount,
  pickCard,
  shuffleCards,
};
