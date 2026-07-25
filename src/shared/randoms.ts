export const randomOf = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomIndex = (arr: unknown[] | string, sliceEnd?: number) =>
  randomOf(0, arr.length - 1 + (sliceEnd === undefined ? 0 : sliceEnd));
export const randomItem = <Item extends unknown[] | string, RetItem extends Item extends (infer It)[] ? It : string>(
  arr: Item,
  sliceEnd?: number,
): RetItem => arr[randomIndex(arr, sliceEnd)] as RetItem;

export const toRandomSorted = <Item>(arr: Item[]) => {
  const items: Item[] = [];
  const arrClone = [...arr];

  for (let i = 0; i < arr.length; i++) items.push(arrClone.splice(randomOf(0, arrClone.length - 1), 1)[0]);

  return items;
};
