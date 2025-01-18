import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { useState } from 'react';
import { IScheduleWidgetUser } from 'shared/api';
import Modal from '../../../modal/Modal/Modal';
import { ModalHeader } from '../../../modal/Modal/ModalHeader';
import IconButton from '../../../the-icon/IconButton';
import { IconCancel02StrokeRounded } from '../../../the-icon/icons/cancel-02';
import { IconImage02StrokeRounded } from '../../../the-icon/icons/image-02';
import { IconLinkBackwardStrokeRounded } from '../../../the-icon/icons/link-backward';
import { useScheduleScopePropsContext } from '../../complect/scope-contexts/scope-props-contexts';
import { schGamesSokiInvocatorClient } from '../../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetUserTakePhoto from '../users/TakePhoto';
import ScheduleWidgetUserPhoto from '../users/UserPhoto';

interface Props {
  user: IScheduleWidgetUser;
  isStriked?: boolean;
  buttons?: React.ReactNode;
}

export default function ScheduleWidgetRemovableUserFace({ user, isStriked, buttons }: Props) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const isUserStriked = isStriked ?? rights.schedule.games?.strikedUsers?.includes(user.mi);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  return (
    <>
      {isPhotoOpen && (
        <Modal onClose={setIsPhotoOpen}>
          <ModalHeader>{user.fio}</ModalHeader>
          <ScheduleWidgetUserPhoto user={user} />
          <div className="flex center">
            <ScheduleWidgetUserTakePhoto user={user} />
          </div>
        </Modal>
      )}
      <div
        key={user.mi}
        className="flex flex-gap margin-gap-v"
      >
        <span className={isUserStriked ? 'color--ko' : ''}>{user.fio}</span>
        <ScheduleWidgetUserPhoto
          user={user}
          justRenderItOnEmpty={<ScheduleWidgetUserTakePhoto user={user} />}
          or={
            <IconButton
              Icon={IconImage02StrokeRounded}
              className="color--7"
              onClick={() => setIsPhotoOpen(true)}
            />
          }
        />
        {buttons}
        <EvaSendButton
          Icon={isUserStriked ? IconLinkBackwardStrokeRounded : IconCancel02StrokeRounded}
          className={isUserStriked ? 'color--ok' : 'color--ko'}
          onSend={() =>
            schGamesSokiInvocatorClient.toggleStrikedUser(
              null,
              scheduleScopeProps,
              user.mi,
              user.fio ?? user.nick ?? '',
            )
          }
        />
      </div>
    </>
  );
}
