import { useMemo } from 'react';
import { makeRegExp } from 'shared/utils';

const deps: [] = [];

export const makeWid = () => ('wid_' + Date.now() + Math.random() + Math.random()).replace(makeRegExp('/\\./g'), '_');
export const useWid = () => useMemo(makeWid, deps);
