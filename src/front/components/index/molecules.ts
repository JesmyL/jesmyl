import { useParams } from 'react-router-dom';
import { LocalSokiAuth, SokiClientSubData, SokiStatistic } from 'shared/api';
import { AppName } from '../../app/App.model';
import {
  atom,
  atomValueSetter,
  getAtomValue,
  Molecule,
  removeMoleculeServerSavedItemTimesFromLocalStorage,
  useAtom,
  useAtomSet,
  useAtomValue,
} from '../../complect/atoms';
import { IndexState } from './Index.model';

const liveDataAtom = atom<Record<SokiClientSubData, unknown>>({});
const statisticAtom = atom<SokiStatistic | null>(null);

export const indexMolecule = new Molecule<IndexState>(
  {
    auth: { level: 0 },
    currentApp: 'cm',
    appVersion: 0,
    schedules: { list: [] },
    statistic: statisticAtom,
    liveData: liveDataAtom,
    rules: [],
    appFontFamily: null,
    fileAssociations: {} as never,
    nounPronsWords: null,
    updateRequisites: {},
    values: {},
  },
  'index',
);
const schedulesAtom = indexMolecule.select(s => s.schedules);

export const useIndexSchedules = () => useAtomValue(schedulesAtom);
export const useIndexFileAssociations = () => useAtomValue(indexMolecule.take('fileAssociations'));
export const useIndexNounPronsWords = () => useAtomValue(indexMolecule.take('nounPronsWords'));
export const useIndexLiveData = () => useAtomValue(indexMolecule.take('liveData'));

export const useIndexValues = () => useAtomValue(indexMolecule.take('values'));

const authAtom = indexMolecule.select(s => s.auth);

export const useAuth = () => useAtomValue(authAtom);
export const useAuthState = () => useAtom(authAtom);
export const useSetAuth = () => {
  const setAuth = useAtomSet(authAtom);
  return (auth: LocalSokiAuth) => {
    setAuth(auth);
    removeMoleculeServerSavedItemTimesFromLocalStorage();
    removePullRequisites();
  };
};

export const useAppFontFamilyAtom = () => useAtom(indexMolecule.take('appFontFamily'));

export const getAuthValue = async () => await getAtomValue(authAtom);
export const setAuthValue = (value: LocalSokiAuth) => atomValueSetter<LocalSokiAuth>(authAtom)(value);

export const getUpdateRequisitesValue = async () => await getAtomValue(indexMolecule.take('updateRequisites'));

export const setUpdateRequisitesValue = atomValueSetter(indexMolecule.take('updateRequisites'));
export const removePullRequisites = () => setUpdateRequisitesValue(null);

export const useCurrentApp = () => useParams().appName as AppName | und;

export const isAuthorizedAtom = atom<boolean>(false);
