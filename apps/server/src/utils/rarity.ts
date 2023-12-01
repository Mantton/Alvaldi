export const RARITY_PROBABILITIES = {
  celestial: 0.01,
  legendary: 0.1,
  elite: 1,
  rare: 5,
  superior: 15,
  common: 78.89,
};

export const RARITY_CARD_COUNT = {
  celestial: 1,
  legendary: 2,
  elite: 3,
  rare: 5,
  superior: 7,
  common: 15,
};

const rarities = [
  "common",
  "superior",
  "rare",
  "elite",
  "legendary",
  "celestial",
] as const;

export const getRandomRarity = (minRarity: (typeof rarities)[number]) => {
  // Filter the rarities array to only include the min rarity and higher
  const eligibleRarities = rarities.slice(rarities.indexOf(minRarity));
  const TOTAL_PROBABILITY = 100;

  // Generate a random number within this total probability
  let rand = Math.random() * TOTAL_PROBABILITY;

  // Determine which rarity is selected based on the random number
  for (const rarity of eligibleRarities) {
    rand -= RARITY_PROBABILITIES[rarity];
    if (rand <= 0) {
      return rarity;
    }
  }

  // As a fallback, return the minimum rarity (shouldn't normally reach here)
  return minRarity;
};
