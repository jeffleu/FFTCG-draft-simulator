// Box Distribution
const packsPerBox = 36;
const legendsPerBox = 7;
const heroesPerBox = 29;

// Pack Distribution
const cardsPerPack = 12;
const commonsPerPack = 7;
const raresPerPack = 3;
const foilsPerPack = 1;

// Navigation Links
const navLinks = [
  {
    name: 'Home',
    url: '/',
    icon: 'fa',
  },
  {
    name: 'Cards',
    url: '/search',
    icon: 'fa fa-search',
  },
  {
    name: 'Deck Editor',
    url: '/deck-editor',
    icon: 'fa fa-pencil-square-o',
  },
  {
    name: 'Draft Simulator',
    url: '/draft',
    icon: 'fa',
  },
];

export {
  cardsPerPack,
  commonsPerPack,
  foilsPerPack,
  heroesPerBox,
  legendsPerBox,
  navLinks,
  packsPerBox,
  raresPerPack,
};
