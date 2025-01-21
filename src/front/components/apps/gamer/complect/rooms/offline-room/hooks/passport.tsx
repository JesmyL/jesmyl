import { useAuth } from '../../../../../../index/atoms';
import { useGamerOfflineRoomsPassportValue } from '../../../../molecules';

export const useGamerOfflineRoomsPassport = () => {
  const authData = useAuth();

  return useGamerOfflineRoomsPassportValue() ?? authData;
};
