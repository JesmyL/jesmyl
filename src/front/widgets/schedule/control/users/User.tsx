import { translateBase } from '#basis/locale';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleUserScopePropsContext, useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom, atom } from 'atomaric';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  IScheduleWidgetUser,
  ScheduleUserScopeProps,
  ScheduleWidgetUserMi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  UserLogin,
} from 'shared/api';
import { UserPushInfo } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { Bool } from 'shared/enums';
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

  const userInfo = rights.userInfoById.get(user.id);
  const userAuth = userInfo?.uauth;
  const userLogin = userInfo?.l;
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
          <ScheduleWidgetUserInform
            userLogin={userLogin}
            willReceiveInform={willReceiveInform}
          />
          <div className="flex center w-full mt-5">
            <ScheduleWidgetUserPhoto user={user} />
          </div>
        </ModalBody>
      </Modal>

      {asUserPlusPrefix === undefined ? userNode : asUserPlusPrefix(userNode, user, balance)}
    </>
  );
};

interface InformProps {
  userLogin: UserLogin | nil;
  willReceiveInform: boolean;
}

const ScheduleWidgetUserInform = ({ userLogin, willReceiveInform }: InformProps) => {
  const [pushInfo, setPushInfo] = useState<UserPushInfo | nil>(null);

  useEffect(() => {
    if (userLogin == null) return;

    let isMounted = true;

    void indexTsjrpcClientMethods
      .getUserPushInfo({ login: userLogin })
      .then(info => {
        if (isMounted) setPushInfo(info);
      })
      .catch(() => null);

    return () => {
      isMounted = false;
    };
  }, [userLogin]);

  const isInformReceivable =
    pushInfo == null
      ? willReceiveInform
      : willReceiveInform && pushInfo.hasSubscription === Bool.True && pushInfo.isMuted === Bool.False;

  return (
    <div className="mt-5">
      <TheIconButton
        icon={isInformReceivable ? 'Notification01' : 'NotificationOff01'}
        postfix={translateBase(
          isInformReceivable ? BaseLocaleKey.ScheduleUserReceiveInform : BaseLocaleKey.ScheduleUserNotReceiveInform,
        )}
        disabled
      />
      {!pushInfo || (
        <TheIconButton
          icon={pushInfo.isSilent === Bool.True ? 'VolumeOff' : 'VolumeHigh'}
          postfix={translateBase(
            pushInfo.isSilent === Bool.True ? BaseLocaleKey.ScheduleInformSoundOff : BaseLocaleKey.ScheduleInformSoundOn,
          )}
          disabled
        />
      )}
    </div>
  );
};

const ScheduleWidgetUserFace = ({ user }: { user: IScheduleWidgetUser }) => {
  const rights = useScheduleWidgetRightsContext();
  const tgAva = rights.userInfoById.get(user.id)?.uauth.tgAva;

  return (
    <span className="grid place-items-center size-9 shrink-0 rounded-full overflow-hidden bg-x5 text-x7 ring-1 ring-x4">
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
