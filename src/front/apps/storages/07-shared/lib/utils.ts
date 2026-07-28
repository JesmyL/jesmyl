export const resortByOrder = <Item>(orderedIndexes: number[] | nil, listToSort: Item[]) => {
  if (orderedIndexes == null) return { list: listToSort, indexes: {} };

  const list: Item[] = [];
  const indexes: Record<number, number> = {};

  orderedIndexes.forEach(index => {
    indexes[list.push(listToSort[index]) - 1] = index;
  });

  return { list, indexes };
};
