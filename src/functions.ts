export const shufflingCards = (cards: any[]) => {
  const shuffle = cards
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.item);
  return shuffle;
};
