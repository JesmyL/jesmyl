import { useMemo } from 'react';
import { makeRegExp } from 'shared/utils';

const deps: [] = [];

export const enum UsedWid {
  def = '',
}

export const makeWid = () =>
  ('wid_' + Date.now() + Math.random() + Math.random()).replace(makeRegExp('/\\./g'), '_') as UsedWid;
export const useWid = () => useMemo(makeWid, deps);
