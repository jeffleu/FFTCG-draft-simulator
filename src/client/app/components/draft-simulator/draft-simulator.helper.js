import _ from 'lodash';

import {
  backupsPerDraft,
  commonsPerPack,
  forwardsPerDraft,
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

// Filters all card data by Type
const filterByType = (cards, type) => cards.filter(card => type === card.type);

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

  // Add remaining backups back to pack
  backups.forEach(backup => pack.push(backup));

  return selectedBackup;
};

// Selects random card from pack
const getRandomCard = pack => {
  const randomIndex = Math.floor(Math.random() * pack.length);
  const randomCard = pack.splice(randomIndex, 1)[0];
  return randomCard;
};

// Selects random card by element set
const getRandomCardByElement = (pack, playerElements) => {
  const elementCards = _.remove(pack, card => playerElements.has(card.element));
  const randomCardByElement = getRandomCard(elementCards);

  // Put remaining cards back into pack
  if (elementCards.length) {
    elementCards.forEach(card => pack.push(card));
  }

  return randomCardByElement;
};

// Checks if pack contains player's elements
const hasPlayerElements = (pack, playerElements) => {
  let result = false;

  for (let i = 0; i < pack.length; i++) {
    const card = pack[i];
    if (playerElements.has(card.element)) {
      result = true;
      break;
    }
  }

  return result;
};

// Checks if pack has certain element and type
const hasElementAndType = (pack, playerElements, type) => {
  let result = false;

  for (let i = 0; i < pack.length; i++) {
    const card = pack[i];
    if (playerElements.has(card.element) && type === card.type) {
      result = true;
      break;
    }
  }

  return result;
};

// Picks a card from the pack
const pickCard = (pack, playerCards) => {
  const playerElements = new Set(playerCards.map((card) => card.element));

  // Flags to see if pack has certain cards
  const hasLegend = filterByRarity(pack, 'Legend')[0];
  const hasHero = filterByRarity(pack, 'Hero')[0];
  const hasForwards = filterByType(pack, 'Forward')[0];
  const hasBackups = filterByType(pack, 'Backup')[0];

  // Number of forwards and backups in hand
  const forwardsCount = filterByType(playerCards, 'Forward').length;
  const backupsCount = filterByType(playerCards, 'Backup').length;

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
    if (hasPlayerElements(pack, playerElements)) {
      if (forwardsCount < forwardsPerDraft && hasElementAndType(pack, playerElements, 'Forward')) {
        selectedCard = getForward(pack, playerElements);
      } else if (backupsCount < backupsPerDraft && hasElementAndType(pack, playerElements, 'Backup')) {
        selectedCard = getBackup(pack, playerElements);
      } else {
        selectedCard = getRandomCardByElement(pack, playerElements);
      }
    } else {
      if (forwardsCount < forwardsPerDraft && hasForwards) {
        selectedCard = getForward(pack, playerElements);
      } else if (backupsCount < backupsPerDraft && hasBackups) {
        selectedCard = getBackup(pack, playerElements);
      } else {
        selectedCard = getRandomCard(pack);
      }
    }
  }

  // Add selected card to player's hand
  playerCards.push(selectedCard);

  return {selectedCard, pack};
};

export {
  createBox,
  createPack,
  filterByOpus,
  filterByRarity,
  filterByType,
  getBackup,
  getFoil,
  getForward,
  getOpus,
  getRandomCard,
  getRandomCardByElement,
  getRandomizedAmount,
  hasPlayerElements,
  hasElementAndType,
  pickCard,
  shuffleCards,
};
