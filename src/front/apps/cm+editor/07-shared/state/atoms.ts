import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';

type History = { value?: PRecord<CmComWid, PRecord<`${number}`, string[]>> };

export const cmEditorComTextsEditsHistoryAtom = atom<History>({});
export const cmEditorComChordEditsHistoryAtom = atom<History>({});
