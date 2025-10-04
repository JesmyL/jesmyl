import { useMemo } from 'react';

const deps: [] = [];

export const enum UsedWid {
  def = '',
}

export const makeWid = () => ('wid_' + Date.now() + `${Math.random()}`.slice(2)) as UsedWid;
export const useWid = () => useMemo(makeWid, deps);
