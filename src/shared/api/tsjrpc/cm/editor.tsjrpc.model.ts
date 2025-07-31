import {
  ChordPack,
  CmComWid,
  CmConstantsConfig,
  CmMp3ContainsPageResult,
  CmMp3Rule,
  EeStorePack,
} from 'shared/api/complect/apps';

export type CmEditorTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  setChords: (args: { chords: ChordPack }) => ChordPack;
  setEEWords: (args: { words: EeStorePack }) => EeStorePack;
  updateConstantsConfig: (args: { config: Partial<CmConstantsConfig> }) => void;
  getResourceHTMLString: (args: { src: string }) => CmMp3ContainsPageResult;

  getMp3RulesList: () => CmMp3Rule[];
  addMp3Rule: (args: { rule: CmMp3Rule }) => void;
  setMp3Rule: (args: { rule: CmMp3Rule }) => void;

  watchComBusies: (args: { comw: CmComWid }) => void;
  unwatchComBusies: () => void;
};
