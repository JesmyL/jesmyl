import { atom } from '#shared/lib/atoms';
import { CmComWidStr } from 'shared/api';
import { ComEditBusy } from 'shared/api/invocators/cm/editor-invocator.shares.model';

export const removedCompositionsAtom = atom<PRecord<CmComWidStr, string>>({});
export const comEditorBusiesAtom = atom<ComEditBusy[]>([]);
