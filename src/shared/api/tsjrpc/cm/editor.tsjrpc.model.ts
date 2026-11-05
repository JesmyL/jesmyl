import { ChordPack, CmComWid, CmMp3ContainsPageResult, CmMp3Rule, EeStorePack } from 'shared/api/complect/apps';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';

export type CmEditorTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  setChords: (args: { chords: ChordPack }) => ChordPack;
  setEEWords: (args: { words: EeStorePack }) => EeStorePack;
  getResourceHTMLString: (args: { src: string }) => CmMp3ContainsPageResult;

  getMp3RulesList: () => CmMp3Rule[];
  addMp3Rule: (args: { rule: CmMp3Rule }) => void;
  setMp3Rule: (args: { rule: CmMp3Rule }) => void;

  getSmartSearchFilters: () => { filters: { id: BackLocaleKey; title: string }[] };
  getSmartSearchComws: (args: { filterId: BackLocaleKey }) => { comws: CmComWid[] };

  watchComBusies: (args: { comw: CmComWid }) => void;
  unwatchComBusies: () => void;
};
