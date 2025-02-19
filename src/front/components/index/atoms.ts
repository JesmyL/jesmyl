import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { SokiAuthLogin } from 'shared/api';
import { AppName } from '../../app/App.model';
import { atom } from '../../shared/lib/atom';
import { authIDB } from './db/auth-idb';
import { indexIDB } from './db/index-idb';
import { IndexSchWTranslationLiveDataValue } from './Index.model';

export const liveDataAtom = atom<IndexSchWTranslationLiveDataValue | null>(null);
export const liveDataStreamersAtom = atom<{ fio: string; login: SokiAuthLogin }[] | null>(null);

export const useIndexSchedules = () => useLiveQuery(() => indexIDB.db.schs.toArray());

export const useIndexFileAssociations = () => indexIDB.useValue.fileAssociations();
export const useIndexValues = () => indexIDB.useValue.values();

export const useAuth = () => authIDB.useValue.auth();

export const useAppFontFamily = () => indexIDB.use.appFontFamily();

export const useCurrentApp = () => useParams().appName as AppName | und;
