import { ChordPack, CmComWid, CmMp3ContainsPageResult, CmMp3Rule, EeStorePack } from 'shared/api/complect/apps';

export type CmEditorSokiInvocatorModel = {
  requestFreshes: (lastModfiedAt: number) => void;

  setChords: (chords: ChordPack) => ChordPack;
  setEEWords: (words: EeStorePack) => EeStorePack;
  getResourceHTMLString: (src: string) => CmMp3ContainsPageResult;

  getMp3RulesList: () => CmMp3Rule[];
  addMp3Rule: (rule: CmMp3Rule) => void;
  setMp3Rule: (rule: CmMp3Rule) => void;

  watchComBusies: (comw: CmComWid) => void;
  unwatchComBusies: () => void;
};
