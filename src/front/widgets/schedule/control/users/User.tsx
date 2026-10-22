import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleUserScopePropsContext, useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { Atom, atom } from 'atomaric';
import { ReactNode, useMemo } from 'react';
import {
  IScheduleWidgetUser,
  ScheduleUserScopeProps,
  ScheduleWidgetUserMi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { takeUserAuthName } from 'shared/utils/user.utils';
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
    <ScheduleUserScopePropsContext value={userScopeProps}>
      <ScheduleWidgetUserInContext {...props} />
    </ScheduleUserScopePropsContext>
  );
};

let isRedactModalOpenAtom: Atom<ScheduleWidgetUserMi | null>;

const ScheduleWidgetUserInContext = ({ user, balance, asUserPlusPrefix }: Props) => {
  isRedactModalOpenAtom ??= atom<ScheduleWidgetUserMi | null>(null);

  const rights = useScheduleWidgetRightsContext();

  const userAuth = rights.userInfoById.get(user.id)?.uauth;
  const userName =
    userAuth?.nick === undefined
      ? takeUserAuthName(userAuth) || <span className="text-x7 italic">{translateBase(BaseLocaleKey.Link)}</span>
      : `${userAuth.fio && userAuth.fio !== userAuth.nick ? `${userAuth.fio} (${userAuth.nick})` : userAuth.nick} `;

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
                {balance < 0 ? (
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
                  ? translateBase(BaseLocaleKey.ScheduleNewUser)
                  : translateBase(BaseLocaleKey.ScheduleInBlock)
                : scheduleWidgetUserRights.texts[balance]?.role?.[0] ||
                  translateBase(BaseLocaleKey.ScheduleUnknown)}
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
                  postfix={translateBase(BaseLocaleKey.ScheduleUserNotReceiveTelegram)}
                  disabled
                />
              ) : (
                <TheIconButton
                  icon="Notification01"
                  postfix={translateBase(BaseLocaleKey.ScheduleUserReceiveTelegram)}
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
