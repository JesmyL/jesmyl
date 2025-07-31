import { atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { ComEditBusy } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';

export const removedCompositionsAtom = atom<PRecord<CmComWid, string>>({});
export const comEditorBusiesAtom = atom<ComEditBusy[]>([]);
