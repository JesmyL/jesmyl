import { useCallback } from 'react';
import { useAuth } from '../../../../../../index/atoms';
import { GamerRoom, GamerRoomMemberStatus } from '../../../../Gamer.model';
import { useGamerCurrentRoom } from './current-room';

export const useGamerUserPossibilities = () => {
  const auth = useAuth();

  return useCallback(
    (room: GamerRoom | und, topLogin: string | und) => {
      if (!auth) return { isUnauthorized: true, isInvalid: true };
      const member = room?.members.find(({ login }) => login === topLogin);

      if (!member) return { isInvalid: true };

      const isRequester = member.status === GamerRoomMemberStatus.Requester;
      const isInactive = member.isInactive;
      const isOwner = member.status === GamerRoomMemberStatus.Owner;
      const isAdmin = member.status === GamerRoomMemberStatus.Admin;

      return {
        isRequester,
        isInactive,
        isOwner,
        isAdmin,
        isManager: isAdmin || isOwner || undefined,
        isInvalid: (isRequester || isInactive) && member.status !== GamerRoomMemberStatus.Owner,
        member,
      };
    },
    [auth],
  );
};

export const useCurrentRoomMemberPossibilities = (topLogin: string | und) => {
  const currentRoom = useGamerCurrentRoom();

  return useGamerUserPossibilities()(currentRoom, topLogin);
};

export const useMyPossibilitiesCurrentRoom = () => {
  const auth = useAuth();
  return useCurrentRoomMemberPossibilities(auth.login);
};

export const useMyPossibilitiesInRoom = () => {
  const auth = useAuth();
  const cb = useGamerUserPossibilities();
  return (room?: GamerRoom) => cb(room, auth.login);
};
