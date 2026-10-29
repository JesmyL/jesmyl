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
  const appInform = rights.schedule.appInform ?? 0;
  const willReceiveInform =
    appInform !== 0 &&
    scheduleWidgetUserRights.checkIsHasRights(
      user.R ?? rights.schedule.ctrl.defu,
      ScheduleWidgetUserRoleRight.Read,
    );
  const userName =
    userAuth?.nick === undefined
      ? takeUserAuthName(userAuth) || <span className="text-x7 italic">{translateBase(BaseLocaleKey.Link)}</span>
      : `${userAuth.fio && userAuth.fio !== userAuth.nick ? `${userAuth.fio} (${userAuth.nick})` : userAuth.nick} `;
  const roleTitle =
    balance < 0
      ? user.R == null
        ? translateBase(BaseLocaleKey.ScheduleNewUser)
        : translateBase(BaseLocaleKey.ScheduleInBlock)
      : scheduleWidgetUserRights.texts[balance]?.role?.[0] || translateBase(BaseLocaleKey.ScheduleUnknown);

  const userNode = (
    <div className="flex gap-2 items-center my-2">
      <ScheduleWidgetUserFace user={user} />
      <span className="flex flex-1 flex-col min-w-0 leading-tight">
        <span className="flex gap-2 items-center">
          <span className="ellipsis">{userName}</span>
          {balance >= 0 || <LazyIcon icon="UserRemove02" className="text-x7" />}
        </span>
        <span className="text-x7 text-[0.7em] ellipsis">{roleTitle}</span>
      </span>
      {!rights.isCanRedactUsers || (
        <LazyIcon
          icon="Edit02"
          className="pointer"
          onClick={() => isRedactModalOpenAtom.set(user.mi)}
        />
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
              {userName} {roleTitle}
            </span>
            <span className="flex gap-2">
              <ScheduleWidgetUserTakePhoto user={user} />
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <ScheduleWidgetUserEdit user={user} />
          <div className="mt-5">
            <div className="text-x7">
              {translateBase(BaseLocaleKey.ScheduleInformStatus, {
                v: appInform !== 0,
                n: appInform >= 5 ? appInform : 0,
              })}
            </div>
            <TheIconButton
              icon={willReceiveInform ? 'Notification01' : 'NotificationOff01'}
              postfix={translateBase(
                willReceiveInform
                  ? BaseLocaleKey.ScheduleUserReceiveInform
                  : BaseLocaleKey.ScheduleUserNotReceiveInform,
              )}
              disabled
            />
          </div>
          <div className="flex center w-full mt-5">
            <ScheduleWidgetUserPhoto user={user} />
          </div>
        </ModalBody>
      </Modal>

      {asUserPlusPrefix === undefined ? userNode : asUserPlusPrefix(userNode, user, balance)}
    </>
  );
};

const ScheduleWidgetUserFace = ({ user }: { user: IScheduleWidgetUser }) => {
  const rights = useScheduleWidgetRightsContext();
  const tgAva = rights.userInfoById.get(user.id)?.uauth.tgAva;

  return (
    <span className="grid place-items-center size-9 shrink-0 rounded-full overflow-hidden bg-x3 text-x7 ring-1 ring-x4">
      {!tgAva || (
        <img
          src={tgAva}
          alt=""
          className="size-full object-cover"
        />
      )}
      {tgAva || (
        <ScheduleWidgetUserPhoto
          user={user}
          className="size-full object-cover"
          or={<LazyIcon icon="User" />}
        />
      )}
    </span>
  );
};
