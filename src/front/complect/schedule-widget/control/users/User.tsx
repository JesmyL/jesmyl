import { ReactNode, useMemo, useState } from 'react';
import { IconEdit02StrokeRounded } from '../../../../complect/the-icon/icons/edit-02';
import { IconLink02StrokeRounded } from '../../../../complect/the-icon/icons/link-02';
import { IconNotification01StrokeRounded } from '../../../../complect/the-icon/icons/notification-01';
import { IconNotificationOff01StrokeRounded } from '../../../../complect/the-icon/icons/notification-off-01';
import { IconUserRemove02StrokeRounded } from '../../../../complect/the-icon/icons/user-remove-02';

import {
  IScheduleWidgetUser,
  ScheduleUserScopeProps,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import Modal from '../../../modal/Modal/Modal';
import { ModalBody } from '../../../modal/Modal/ModalBody';
import { ModalHeader } from '../../../modal/Modal/ModalHeader';
import IconButton from '../../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../../complect/scope-contexts/useScheduleScopePropsContext';
import { ScheduleUserScopePropsContext } from '../../complect/scope-contexts/useScheduleUserScopePropsContext';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetUserTakePhoto from './TakePhoto';
import { ScheduleWidgetUserEdit } from './UserEdit';
import ScheduleWidgetUserPhoto from './UserPhoto';

interface Props {
  user: IScheduleWidgetUser;
  balance: number;
  asUserPlusPrefix?: (userNode: ReactNode, user: IScheduleWidgetUser, balance: number) => ReactNode;
}

export const ScheduleWidgetUser = (props: Props) => {
  const scheduleScopeProps = useScheduleScopePropsContext();
  const userScopeProps: ScheduleUserScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, userMi: props.user.mi }),
    [scheduleScopeProps, props.user.mi],
  );
  return (
    <ScheduleUserScopePropsContext.Provider value={userScopeProps}>
      <ScheduleWidgetUserInContext {...props} />
    </ScheduleUserScopePropsContext.Provider>
  );
};

const ScheduleWidgetUserInContext = ({ user, balance, asUserPlusPrefix }: Props) => {
  const rights = useScheduleWidgetRightsContext();
  const userName =
    user.nick === undefined
      ? user.fio || <span className="color--7 text-italic">Ссылка</span>
      : `${user.fio && user.fio !== user.nick ? `${user.fio} (${user.nick})` : user.nick} `;

  const [isRedactModalOpen, setIsRedactModalOpen] = useState(false);

  const userNode = (
    <div className="flex flex-gap between margin-gap-v">
      {!rights.isCanRedactUsers ? (
        userName
      ) : (
        <>
          <span className="flex flex-gap">
            {userName}
            {balance !== undefined && (
              <span className="flex flex-gap color--7">
                {user.login === undefined ? (
                  <>
                    <IconLink02StrokeRounded className="color--7 icon-scale-05" />
                    {balance < 0 ? null : balance}
                  </>
                ) : balance < 0 ? (
                  <IconUserRemove02StrokeRounded />
                ) : (
                  balance
                )}
              </span>
            )}
          </span>
          <span className="flex flex-gap">
            <IconButton
              Icon={IconEdit02StrokeRounded}
              className="flex between full-width"
              onClick={() => setIsRedactModalOpen(true)}
            />
          </span>
        </>
      )}
    </div>
  );

  return (
    <>
      {isRedactModalOpen && (
        <Modal onClose={setIsRedactModalOpen}>
          <ModalHeader>
            <div className="flex between flex-gap">
              <span>
                {userName}
                {'- '}
                {balance < 0
                  ? user.R == null
                    ? 'Новый'
                    : 'в блоке'
                  : scheduleWidgetUserRights.texts[balance]?.role?.[0] || 'Неизвестный'}
              </span>
              <span className="flex flex-gap">
                <ScheduleWidgetUserTakePhoto user={user} />
              </span>
            </div>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetUserEdit user={user} />
            {user.tgId != null && (
              <div className="margin-big-gap-t">
                {user.tgInform === 0 ||
                !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.Read) ? (
                  <IconButton
                    Icon={IconNotificationOff01StrokeRounded}
                    postfix="Участник не получает TG-уведомления"
                    disabled
                  />
                ) : (
                  <IconButton
                    Icon={IconNotification01StrokeRounded}
                    postfix="Участник получает TG-уведомления"
                    disabled
                  />
                )}
              </div>
            )}
            <div className="flex center full-width margin-big-gap-t">
              <ScheduleWidgetUserPhoto user={user} />
            </div>
          </ModalBody>
        </Modal>
      )}
      {asUserPlusPrefix === undefined ? userNode : asUserPlusPrefix(userNode, user, balance)}
    </>
  );
};
