import { bottomPopupContentPreparer } from '../../../../../complect/absolute-popup/bottom-popup/item-preparer';
import { IconUserRemove01StrokeRounded } from '../../../../../complect/the-icon/icons/user-remove-01';
import { GamerRoomMember } from '../../Gamer.model';
import { useGamerRoomActions } from '../../complect/rooms/hooks/actions';
import { useGamerCurrentRoom } from '../../complect/rooms/room/hooks/current-room';
import { useGamerUserPossibilities } from '../../complect/rooms/room/hooks/possibilities';
import { useSpyExcludeMember } from './hooks/actions';

export default function SpyRoomMemberInStartGameMore({ member }: { member: GamerRoomMember }) {
  const { moreButtons, nameNode } = useGamerRoomActions(member);
  const excludeMember = useSpyExcludeMember();
  const currentRoom = useGamerCurrentRoom();
  const memberPossibilities = useGamerUserPossibilities();
  const possibilities = memberPossibilities(currentRoom, member.login);

  return (
    <>
      {bottomPopupContentPreparer({
        items: [
          {
            titleNode: <>Игорк {nameNode} выбыл из игры</>,
            Icon: IconUserRemove01StrokeRounded,
            onClick: () => excludeMember(member.login),
          },
        ],
      })}
      {moreButtons(member, possibilities)}
    </>
  );
}
