import { CmComWid } from 'shared/api';
import { cmEditorComChordEditsHistoryAtom, cmEditorComTextsEditsHistoryAtom } from '../state/atoms';

type HistoryAtom = typeof cmEditorComTextsEditsHistoryAtom;

const pushToBuffer = (atom: HistoryAtom, comw: CmComWid, texti: number, text: string | nil) => {
  if (!text) return;

  atom.do.update(history => {
    history[comw] ??= {};
    history[comw][texti] = Array.from(new Set([text].concat(history[comw][texti] ?? [])));
  });
};

export const pushComTextBlockToBuffer = (comw: CmComWid, texti: number, text: string | nil) =>
  pushToBuffer(cmEditorComTextsEditsHistoryAtom, comw, texti, text);

export const pushComChordBlockToBuffer = (comw: CmComWid, texti: number, text: string | nil) =>
  pushToBuffer(cmEditorComChordEditsHistoryAtom, comw, texti, text);
