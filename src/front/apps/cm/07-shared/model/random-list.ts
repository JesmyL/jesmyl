import { CmAudioTail, CmComWid } from 'shared/api';

/** One entry of the player's shuffle prev-list; the list order lives in the atom, not in the item. */
export type CmRandomListItem = { comw: CmComWid; l: CmAudioTail };

/** Persisted prev-list row: `i` is the auto-incremented key, so ascending key order is the history order. */
export type CmRandomListRow = { i: number; l: CmAudioTail; comw: CmComWid };

/** Insert shape of a history row: `i` is assigned by the store on a full rewrite. */
export type CmRandomListRowInsert = Omit<CmRandomListRow, 'i'> & { i?: number };
