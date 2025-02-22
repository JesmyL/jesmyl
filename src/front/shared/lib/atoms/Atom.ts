import { useSyncExternalStore } from 'react';
import { Atom } from './AnAtom';

export const useAtomValue = <Value>(atom: Atom<Value>) => {
  return useSyncExternalStore(atom.subscribe, atom.get);
};

export const useAtomSet = <Value>(atom: Atom<Value>) => atom.set;
export const useAtomGet = <Value>(atom: Atom<Value>) => atom.get;
export const useAtomToggle = (atom: Atom<boolean>) => atom.toggle;
export const useAtomInkrement = (atom: Atom<number>) => atom.inkrement;

export const useAtom = <Value>(atom: Atom<Value>) => [useAtomValue(atom), useAtomSet(atom)] as const;

export const atom = <Value>(value: Value): Atom<Value> => new Atom(value);

export const getAtomValue = async <Value>(atom: Atom<Value>) => await atom.getStorageValue();
export const atomValueSetter =
  <Value>(atom: Atom<Value>) =>
  (value: Value | ((prev: Value) => Value)) =>
    atom.set(value);
