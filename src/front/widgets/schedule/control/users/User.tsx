import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleUserScopePropsContext, useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { atom } from 'atomaric';
import { ReactNode, useMemo } from 'react';
import {
  IScheduleWidgetUser,
  IScheduleWidgetUserMi,
  ScheduleUserScopeProps,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
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

const isRedactModalOpenAtom = atom<IScheduleWidgetUserMi | null>(null);

const ScheduleWidgetUserInContext = ({ user, balance, asUserPlusPrefix }: Props) => {
  const rights = useScheduleWidgetRightsContext();

  const userName =
    user.nick === undefined
      ? user.fio || <span className="text-x7 italic">Ссылка</span>
      : `${user.fio && user.fio !== user.nick ? `${user.fio} (${user.nick})` : user.nick} `;

  const userNode = (
    <div className="flex gap-2 between my-2">
      {!rights.isCanRedactUsers ? (
        userName
      ) : (
        <>
          <span className="flex gap-2">
            {userName}
            {balance !== undefined && (
              <span className="flex gap-2 text-x7">
                {user.login === undefined ? (
                  <>
                    <LazyIcon
                      icon="Link02"
                      className="text-x7 icon-scale-05"
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
          <span className="flex gap-2">
            <LazyIcon
              icon="Edit02"
              className="pointer flex between w-full"
              onClick={() => isRedactModalOpenAtom.set(user.mi)}
            />
          </span>
        </>
      )}
    </div>
  );

  return (
    <>
      <Modal
        openAtom={isRedactModalOpenAtom}
        checkIsOpen={mi => mi === user.mi}
        isRenderHere
      >
        <ModalHeader>
          <div className="flex between gap-2">
            <span>
              {userName}
              {balance < 0
                ? user.R == null
                  ? ' - Новый'
                  : ' - в блоке'
                : scheduleWidgetUserRights.texts[balance]?.role?.[0] || ' - Неизвестный'}
            </span>
            <span className="flex gap-2">
              <ScheduleWidgetUserTakePhoto user={user} />
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <ScheduleWidgetUserEdit user={user} />
          {user.tgId != null && (
            <div className="mt-5">
              {user.tgInform === 0 ||
              !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.Read) ? (
                <TheIconButton
                  icon="NotificationOff01"
                  postfix="Участник не получает TG-уведомления"
                  disabled
                />
              ) : (
                <TheIconButton
                  icon="Notification01"
                  postfix="Участник получает TG-уведомления"
                  disabled
                />
              )}
            </div>
          )}
          <div className="flex center w-full mt-5">
            <ScheduleWidgetUserPhoto user={user} />
          </div>
        </ModalBody>
      </Modal>

      {asUserPlusPrefix === undefined ? userNode : asUserPlusPrefix(userNode, user, balance)}
    </>
  );
};
