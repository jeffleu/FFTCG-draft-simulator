// Get Opus from card's serial number
export const getOpus = card => Number(card.serial_number.split('-')[0]);

// Filters all card data by Opus
export const filterByOpus = (cards, opus) => {
  return cards.filter(card => {
    const currentOpus = getOpus(card);
    return opus === currentOpus;
  });
};

// Filters all card data by Opus and Rarity
export const filterByOpusAndRarity = (cards, opus, rarity) => {
  return cards.filter(card => {
    const currentOpus = getOpus(card);
    const currentRarity = card.rarity;
    return opus === currentOpus && rarity === currentRarity;
  });
};

// Create a box based on Opus
export const createBox = (opus) => {

};
