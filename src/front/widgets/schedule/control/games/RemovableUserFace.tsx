import { Modal, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schGamesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { atom } from 'atomaric';
import { IScheduleWidgetUser } from 'shared/api';
import { ScheduleWidgetUserTakePhoto } from '../users/TakePhoto';
import { ScheduleWidgetUserPhoto } from '../users/UserPhoto';

interface Props {
  user: IScheduleWidgetUser;
  isStriked?: boolean;
  buttons?: React.ReactNode;
}

const isPhotoOpenAtom = atom(false);

export function ScheduleWidgetRemovableUserFace({ user, isStriked, buttons }: Props) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const isUserStriked = isStriked ?? rights.schedule.games?.strikedUsers?.includes(user.mi);

  return (
    <>
      <div
        key={user.mi}
        className="flex gap-2 my-2"
      >
        <span className={isUserStriked ? 'text-xKO' : ''}>{user.fio}</span>
        <ScheduleWidgetUserPhoto
          user={user}
          justRenderItOnEmpty={<ScheduleWidgetUserTakePhoto user={user} />}
          or={
            <LazyIcon
              icon="Image02"
              className="pointer text-x7"
              onClick={isPhotoOpenAtom.do.toggle}
            />
          }
        />
        {buttons}
        <TheIconSendButton
          icon={isUserStriked ? 'LinkBackward' : 'Cancel02'}
          className={isUserStriked ? 'text-xOK' : 'text-xKO'}
          onSend={() =>
            schGamesTsjrpcClient.toggleStrikedUser({
              props: scheduleScopeProps,
              userMi: user.mi,
              userName: user.fio ?? user.nick ?? '',
            })
          }
        />
      </div>

      <Modal openAtom={isPhotoOpenAtom}>
        <ModalHeader>{user.fio}</ModalHeader>
        <ScheduleWidgetUserPhoto user={user} />
        <div className="flex center">
          <ScheduleWidgetUserTakePhoto user={user} />
        </div>
      </Modal>
    </>
  );
}
