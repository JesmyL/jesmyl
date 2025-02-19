import { ReactNode, useMemo, useState } from 'react';

import { IconButton, LazyIcon } from '#shared/ui/icon';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import {
  IScheduleWidgetUser,
  ScheduleUserScopeProps,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import {
  ScheduleUserScopePropsContext,
  useScheduleScopePropsContext,
} from '../../complect/scope-contexts/scope-props-contexts';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import { ScheduleWidgetUserTakePhoto } from './TakePhoto';
import { ScheduleWidgetUserEdit } from './UserEdit';
import { ScheduleWidgetUserPhoto } from './UserPhoto';

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
                    <LazyIcon
                      icon="Link02"
                      className="color--7 icon-scale-05"
                    />
                    {balance < 0 ? null : balance}
                  </>
                ) : balance < 0 ? (
                  <LazyIcon icon="UserRemove02" />
                ) : (
                  balance
                )}
              </span>
            )}
          </span>
          <span className="flex flex-gap">
            <LazyIcon
              icon="Edit02"
              className="pointer flex between full-width"
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
                    icon="NotificationOff01"
                    postfix="Участник не получает TG-уведомления"
                    disabled
                  />
                ) : (
                  <IconButton
                    icon="Notification01"
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
