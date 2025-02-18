import { authIDB } from '#basis/lib/idb/auth';
import { indexIDB } from '#basis/lib/idb/index/index';
import { AppName } from '#basis/model/App.model';
import { useLiveQuery } from 'dexie-react-hooks';
import { atom } from 'front/08-shared/lib/atoms';
import { useParams } from 'react-router-dom';
import { SokiAuthLogin } from 'shared/api';
import { IndexSchWTranslationLiveDataValue } from './Index.model';

export const liveDataAtom = atom<IndexSchWTranslationLiveDataValue | null>(null);
export const liveDataStreamersAtom = atom<{ fio: string; login: SokiAuthLogin }[] | null>(null);

export const useIndexSchedules = () => useLiveQuery(() => indexIDB.db.schs.toArray());

export const useIndexFileAssociations = () => indexIDB.useValue.fileAssociations();
export const useIndexValues = () => indexIDB.useValue.values();

export const useAuth = () => authIDB.useValue.auth();

export const useAppFontFamily = () => indexIDB.use.appFontFamily();

export const useCurrentApp = () => useParams().appName as AppName | und;
