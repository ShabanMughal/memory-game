export const generateCards = () => {
  const values = ['🦁', '🐯', '🐻', '🐼', '🐨', '🐸', '🦄', '🦋'];
  const cards = [...values, ...values]
    .sort(() => Math.random() - 0.5)
    .map((value) => ({ value, isFlipped: false }));
  return cards;
};
