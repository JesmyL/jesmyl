import { Atom } from 'atomaric';
import { ReactNode } from 'react';

export type BroadcastGridTabConfig<TabId extends number> = {
  tabs: BroadcastGridTabDict<TabId>;
  gridSizesAtom: Atom<BroadcastGridNumberNetPack>;
  activeTabiAtom: Atom<BroadcastGridNumberNetPack>;
  tabNetAtom: Atom<BroadcastGridTabNet<TabId>>;
};

export type BroadcastGridTabDict<TabId extends number> = Record<TabId, { Comp: () => ReactNode; title: () => string }>;

export type BroadcastGridNumberNetPack = [number, number, number, number, number, number];

export type BroadcastGridTabNet<TabId extends number> = [
  [TabId, ...TabId[]],
  [TabId, ...TabId[]],
  [TabId, ...TabId[]],
  [TabId, ...TabId[]],
  [TabId, ...TabId[]],
  [TabId, ...TabId[]],
];
