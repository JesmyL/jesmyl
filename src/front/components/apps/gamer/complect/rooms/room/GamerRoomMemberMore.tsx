import { bottomPopupContentPreparer } from '../../../../../../complect/absolute-popup/bottom-popup/item-preparer';
import { IconPlusSignStrokeRounded } from '../../../../../../complect/the-icon/icons/plus-sign';
import { IconUserBlock01StrokeRounded } from '../../../../../../complect/the-icon/icons/user-block-01';
import { useAuth } from '../../../../../index/atoms';
import { GamerRoomMember } from '../../../Gamer.model';
import { useGamerRoomActions } from '../hooks/actions';
import { useGamerCurrentRoom } from './hooks/current-room';
import { useGamerUserPossibilities } from './hooks/possibilities';

export const GamerRoomMemberMore = ({ member }: { member: GamerRoomMember }) => {
  const { acceptMemberToCurrentRoom, banCurrentRoomMember, unbanCurrentRoomMember, moreButtons, nameNode } =
    useGamerRoomActions(member);
  const auth = useAuth();
  const currentRoom = useGamerCurrentRoom();
  const possibilities = useGamerUserPossibilities()(currentRoom, member.login);

  return (
    <>
      {bottomPopupContentPreparer({
        items: [
          possibilities.isRequester && {
            titleNode: <>Принять участника {nameNode}</>,
            Icon: IconPlusSignStrokeRounded,
            onClick: () => acceptMemberToCurrentRoom(member.login),
          },
          !possibilities.isOwner &&
            possibilities.member?.login !== auth.login && {
              titleNode: (
                <>
                  {possibilities.isInactive ? 'Разблокировать участника' : 'Заблокировать участника'} {nameNode}
                </>
              ),
              Icon: IconUserBlock01StrokeRounded,
              onClick: () =>
                possibilities.isInactive ? unbanCurrentRoomMember(member.login) : banCurrentRoomMember(member.login),
            },
        ],
      })}
      {moreButtons(member, possibilities)}
    </>
  );
};
