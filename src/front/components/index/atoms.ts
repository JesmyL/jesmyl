import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { SokiAuthLogin, SokiStatistic } from 'shared/api';
import { AppName } from '../../app/App.model';
import { atom } from '../../complect/atoms';
import { indexIDB } from './db/index-idb';
import { IndexSchWTranslationLiveDataValue } from './Index.model';

export const liveDataAtom = atom<IndexSchWTranslationLiveDataValue | null>(null);
export const liveDataStreamersAtom = atom<{ fio: string; login: SokiAuthLogin }[] | null>(null);
export const statisticAtom = atom<SokiStatistic | null>(null);

export const useIndexSchedules = () => useLiveQuery(() => indexIDB.db.schs.toArray());

export const useIndexFileAssociations = () => indexIDB.useValue.fileAssociations();
export const useIndexValues = () => indexIDB.useValue.values();

export const useAuth = () => indexIDB.useValue.auth();

export const useAppFontFamily = () => indexIDB.use.appFontFamily();

export const useCurrentApp = () => useParams().appName as AppName | und;

export const isAuthorizedAtom = atom<boolean>(false);
