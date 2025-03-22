import { atom } from '#shared/lib/atoms';
import { CmComWid } from 'shared/api';
import { ComEditBusy } from 'shared/api/invocators/cm/editor-invocator.shares.model';

export const removedCompositionsAtom = atom<PRecord<CmComWid, string>>({});
export const comEditorBusiesAtom = atom<ComEditBusy[]>([]);
