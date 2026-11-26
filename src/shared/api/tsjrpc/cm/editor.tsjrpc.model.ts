import { ChordPack, CmComWid, CmMp3ContainsPageResult, CmMp3Rule, EeStorePack } from 'shared/api/complect/apps';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { IIncorrects } from 'shared/model/cm/Incorrects';

export type CmEditorTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  setChords: (args: { chords: ChordPack }) => ChordPack;
  setEEWords: (args: { words: EeStorePack }) => EeStorePack;
  checkTextEe: (args: { texts: string[] }) => IIncorrects[];
  getEEWords: (args: { words: string[] }) => EeStorePack;
  searchEEWords: (args: { query: string; limit: number }) => { words: EeStorePack; total: number };
  getIncorrectEeWords: () => { words: string[] };
  getResourceHTMLString: (args: { src: string }) => CmMp3ContainsPageResult;

  getMp3RulesList: () => CmMp3Rule[];
  addMp3Rule: (args: { rule: CmMp3Rule }) => void;
  setMp3Rule: (args: { rule: CmMp3Rule }) => void;

  getSmartSearchFilters: () => { filters: { id: BackLocaleKey; title: string }[] };
  getSmartSearchComws: (args: { filterId: BackLocaleKey }) => { comws: CmComWid[] };

  watchComBusies: (args: { comw: CmComWid }) => void;
  unwatchComBusies: () => void;
};
