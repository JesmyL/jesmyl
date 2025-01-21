import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DeviceId, LocalSokiAuth, SokiClientSubData, SokiStatistic } from 'shared/api';
import { AppName } from '../../app/App.model';
import { atom } from '../../complect/atoms';
import { indexIDB } from './db/index-idb';

export const liveDataAtom = atom<Record<SokiClientSubData, unknown>>({});
export const statisticAtom = atom<SokiStatistic | null>(null);

export const useIndexSchedules = () => useLiveQuery(() => indexIDB.db.schs.toArray());

export const useIndexFileAssociations = () => indexIDB.useSingleValueLiveQuery('fileAssociations');
export const useDeviceId = () => indexIDB.useSingleValueLiveQuery('dviceId', DeviceId.def);
export const useIndexValues = () => indexIDB.useSingleValueLiveQuery('values', {} as never);

const defAuth: LocalSokiAuth = { level: 0 };
export const useAuth = () => indexIDB.useSingleValueLiveQuery('auth', defAuth);
export const useAuthState = () => indexIDB.useSingleValueState('auth', defAuth);
export const useSetAuth = () => useCallback((auth: LocalSokiAuth) => indexIDB.setSingleValue('auth', auth), []);

export const useAppFontFamily = () => indexIDB.useSingleValueState('appFontFamily', null);

export const getAuthValue = () => indexIDB.getSingleValue('auth', defAuth);
export const setAuthValue = (auth: LocalSokiAuth) => indexIDB.setSingleValue('auth', auth);

export const useCurrentApp = () => useParams().appName as AppName | und;

export const isAuthorizedAtom = atom<boolean>(false);
