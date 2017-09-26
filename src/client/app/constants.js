// Box Distribution
const packsPerBox = 36;
const legendsPerBox = 7;
const heroesPerBox = 29;

// Pack Distribution
const cardsPerPack = 12;
const commonsPerPack = 7;
const raresPerPack = 3;
const foilsPerPack = 1;

// Draft Numbers
const forwardsPerDraft = 30;
const backupsPerDraft = 15;

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
  backupsPerDraft,
  cardsPerPack,
  commonsPerPack,
  foilsPerPack,
  forwardsPerDraft,
  heroesPerBox,
  legendsPerBox,
  navLinks,
  packsPerBox,
  raresPerPack,
};
