export const quickSort = <Item>(
  items: Item[],
  compareFn?: (a: Item, b: Item) => number,
  interval = 0,
  reseter?: { t: TimeOut },
) => {
  compareFn ??= (a, b) => (a > b ? 1 : a === b ? 0 : -1);
  reseter ??= { t: undefined };

  const sort = async (items: Item[]): Promise<Item[]> => {
    if (items.length < 2) return items;

    const { promise, resolve } = Promise.withResolvers<Item[]>();

    reseter.t = setTimeout(async () => {
      const less = [];
      const great = [];
      const pivot = items[0];
      const list = items.slice(1);

      for (const item of list)
        if (compareFn(item, pivot) < 1) less.push(item);
        else great.push(item);

      resolve((await sort(less)).concat(pivot, await sort(great)));
    }, interval);

    return promise;
  };

  return sort(items);
};
