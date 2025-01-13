import { ChordPack, CmMp3ContainsPageResult, CmMp3Rule, EeStorePack } from 'shared/api/complect/apps';

export type CmOtherSokiInvocatorMethods = {
  setChords: (chords: ChordPack) => ChordPack;
  setEEWords: (words: EeStorePack) => EeStorePack;
  getResourceHTMLString: (src: string) => CmMp3ContainsPageResult;
  getMp3RulesList: () => CmMp3Rule[];
};
