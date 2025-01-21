import { LocalSokiAuth } from 'shared/api';
import { useAuth } from '../../../../../index/atoms';
import { SpyRoomState } from '../Spy.model';
import { unsecretSpyRole } from './locations';
import { useSpyRoomStateNaked } from './state';

export const useSpyMyRoleNaked = () => useSpyMyRole(useSpyRoomStateNaked(), useAuth());

export const useSpyMyRole = (state: SpyRoomState | und, auth: LocalSokiAuth) => {
  return state?.roles && auth.login && unsecretSpyRole(state.roles[auth.login]);
};
