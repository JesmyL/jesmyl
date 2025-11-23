import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';

export const cmEditorComTextsEditsHistoryAtom = atom({} as PRecord<CmComWid, PRecord<number, string[]>>);
export const cmEditorComChordEditsHistoryAtom = atom({} as PRecord<CmComWid, PRecord<number, string[]>>);
