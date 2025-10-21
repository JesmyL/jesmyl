import { AppName } from '#basis/model/App.model';
import { atom } from 'atomaric';

export const currentAppNameAtom = atom<AppName | null>(null);
