import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schRolesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { extractScheduleWidgetRoleUser } from '#widgets/schedule/useScheduleWidget';
import { useAuth } from '$index/shared/state';
import { Atom, atom } from 'atomaric';
import React, { useMemo } from 'react';
import { IScheduleWidgetRole, ScheduleRoleScopeProps, scheduleWidgetUserRights } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetRoleFace } from './RoleFace';

const mainRoleRights = scheduleWidgetUserRights.getAllRights();
const LazyIconConfigurator = React.lazy(() => import('../../../../shared/ui/configurators/Icon'));

let isUserSetModalOpenAtom: Atom<boolean>;
let isCatSetModalOpenAtom: Atom<boolean>;
let isCatRedactModalOpenAtom: Atom<boolean>;

export function ScheduleWidgetRole({ role }: { role: IScheduleWidgetRole }) {
  isUserSetModalOpenAtom ??= atom(false);
  isCatSetModalOpenAtom ??= atom(false);
  isCatRedactModalOpenAtom ??= atom(false);

  const rights = useScheduleWidgetRightsContext();
  const auth = useAuth();
  const roleUser = extractScheduleWidgetRoleUser(rights.schedule, 0, role);
  const catsRedact = useIsRedactArea({
    redactable: true,
    canRedact: true,
    isShowDoneButton: true,
  });
  const scheduleScopeProps = useScheduleScopePropsContext();
  const roleScopeProps: ScheduleRoleScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, roleMi: role.mi }),
    [role.mi, scheduleScopeProps],
  );

  return (
    <div className="flex gap-2 between m-2">
      <ScheduleWidgetRoleFace
        schedule={rights.schedule}
        role={role}
      />
      {(rights.isCanTotalRedact || (rights.isCanRedact && auth && auth.login === roleUser?.login)) && (
        <LazyIcon
          className="pointer"
          icon="Edit01"
          onClick={isCatRedactModalOpenAtom.do.toggle}
        />
      )}

      <Modal openAtom={isUserSetModalOpenAtom}>
        <ModalHeader>
          <div className="flex">{translateBase(BaseLocaleKey.ScheduleRoleWillTake, { t: role.title })}</div>
        </ModalHeader>
        <ModalBody>
          {rights.schedule.ctrl.users.map((user, useri) => {
            if (
              (roleUser && user.login === roleUser.login) ||
              (role.mi === 0 && (user.R ?? rights.schedule.ctrl.defu) !== mainRoleRights)
            )
              return null;

            return (
              <TheIconSendButton
                key={useri}
                confirm={translateBase(BaseLocaleKey.ScheduleUserTakeRole, {
                  u: user?.fio || user?.nick || '?',
                  t: role.title,
                })}
                className="flex gap-2 pointer"
                icon="User"
                postfix={user?.fio || user?.nick}
                onSuccess={isUserSetModalOpenAtom.reset}
                onSend={() =>
                  schRolesTsjrpcClient.setRoleUser({
                    props: roleScopeProps,
                    value: user.mi,
                    roleTitle: role.title,
                    userName: user.fio ?? user.nick ?? '?',
                  })
                }
              />
            );
          })}
        </ModalBody>
      </Modal>

      <Modal openAtom={isCatSetModalOpenAtom}>
        <ModalHeader>
          <div className="flex between">
            <span>{translateBase(BaseLocaleKey.ScheduleRoleToCategory, { t: role.title })}</span>

            {catsRedact.editIcon}
          </div>
        </ModalHeader>
        <ModalBody>
          {catsRedact.isRedact
            ? rights.schedule.ctrl.cats.map((catName, catNamei) => {
                return (
                  <StrongEditableField
                    key={catNamei}
                    isRedact
                    value={catName}
                    onSend={value =>
                      schRolesTsjrpcClient.setRoleCategoryTitle({
                        props: scheduleScopeProps,
                        cati: catNamei,
                        title: value,
                        prevTitle: catName,
                      })
                    }
                  />
                );
              })
            : rights.schedule.ctrl.cats.map((catName, catNamei) => {
                return (
                  <TheIconSendButton
                    key={catNamei}
                    className="flex gap-2 pointer m-2"
                    icon="Folder01"
                    postfix={catName}
                    onSuccess={isCatSetModalOpenAtom.reset}
                    onSend={() =>
                      schRolesTsjrpcClient.setCategoryForRole({
                        props: roleScopeProps,
                        value: catNamei,
                        roleTitle: role.title,
                        catTitle: catName,
                      })
                    }
                  />
                );
              })}
        </ModalBody>
        <ModalFooter>
          {!rights.schedule.ctrl.cats.includes('') && catsRedact.isRedact && (
            <TheIconSendButton
              icon="FolderAdd"
              onSend={() => schRolesTsjrpcClient.addRoleCategory({ props: roleScopeProps })}
            />
          )}
        </ModalFooter>
      </Modal>

      <Modal openAtom={isCatRedactModalOpenAtom}>
        <ModalHeader>{translateBase(BaseLocaleKey.ScheduleRoleRedact, { t: role.title })}</ModalHeader>
        <ModalBody>
          <StrongEditableField
            isRedact
            title={translateBase(BaseLocaleKey.Name)}
            icon="SchoolReportCard"
            value={role}
            fieldKey="title"
            postfix={roleUser && ' - ' + (roleUser.fio || roleUser.nick)}
            onSend={value => schRolesTsjrpcClient.setRoleTitle({ props: roleScopeProps, value, prevTitle: role.title })}
          />
          <LazyIconConfigurator
            header={translateBase(BaseLocaleKey.ScheduleRoleIcon, { t: role.title })}
            icon={role.icon ?? 'Github01'}
            used={rights.schedule.ctrl.roles.map(role => role.icon)}
            onSend={icon =>
              schRolesTsjrpcClient.setRoleIcon({
                props: roleScopeProps,
                value: icon,
                roleTitle: role.title,
              })
            }
          />
          {rights.isCanTotalRedact && (
            <>
              {role.mi !== 0 && roleUser && (
                <TheIconSendButton
                  icon="UserRemove01"
                  confirm={translateBase(BaseLocaleKey.ScheduleUserNoMoreRole, {
                    u: roleUser.fio || roleUser.nick || '?',
                    t: role.title,
                  })}
                  postfix={translateBase(BaseLocaleKey.ScheduleFreeRole)}
                  className="flex-max my-2"
                  onSend={() => schRolesTsjrpcClient.makeFreeRole({ props: roleScopeProps, value: role.title })}
                />
              )}
              {roleUser ? (
                <TheIconButton
                  icon="ArrowReloadHorizontal"
                  onClick={isUserSetModalOpenAtom.do.toggle}
                  postfix={translateBase(BaseLocaleKey.ScheduleReplacePerson)}
                  className="flex-max my-2"
                />
              ) : (
                <TheIconButton
                  icon="UserAdd01"
                  onClick={isUserSetModalOpenAtom.do.toggle}
                  postfix={translateBase(BaseLocaleKey.ScheduleAppointPerson)}
                  className="flex-max my-2"
                />
              )}
              {role.mi > 0 && (
                <TheIconButton
                  icon="GridView"
                  onClick={isCatSetModalOpenAtom.do.toggle}
                  postfix={translateBase(BaseLocaleKey.ScheduleCategory, {
                    t: rights.schedule.ctrl.cats[role.cati || 0] || translateBase(BaseLocaleKey.ScheduleMain),
                  })}
                  className="flex-max my-2"
                />
              )}
            </>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
