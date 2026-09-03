import { atom } from 'atomaric';

export const bibleBroadcastCurrentSelectedIndexAtom = atom(0);
export const bibleBroadcastCurrentListLengthAtom = atom(0);

bibleBroadcastCurrentListLengthAtom.subscribe(len => {
  const index = bibleBroadcastCurrentSelectedIndexAtom.get();

  if (index >= len) bibleBroadcastCurrentSelectedIndexAtom.set(len - 1);
  else if (index < 0) bibleBroadcastCurrentSelectedIndexAtom.set(0);
});

bibleBroadcastCurrentSelectedIndexAtom.subscribe(index => {
  const len = bibleBroadcastCurrentListLengthAtom.get();

  if (index >= len) bibleBroadcastCurrentSelectedIndexAtom.set(len - 1);
  else if (index < 0) bibleBroadcastCurrentSelectedIndexAtom.set(0);
});
