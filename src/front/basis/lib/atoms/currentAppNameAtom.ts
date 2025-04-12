import { AppName } from '#basis/model/App.model';
import { atom } from '#shared/lib/atom';

export const currentAppNameAtom = atom<AppName | null>(null);
