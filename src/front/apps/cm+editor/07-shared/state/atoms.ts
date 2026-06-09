import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';

type History = PRecord<CmComWid, PRecord<RKey<number>, string[]>>;

export const cmEditorComTextsEditsHistoryAtom = atom<History>({});
export const cmEditorComChordEditsHistoryAtom = atom<History>({});
