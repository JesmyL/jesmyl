import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schRolesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { extractScheduleWidgetRoleUser } from '#widgets/schedule/useScheduleWidget';
import { atom } from 'atomaric';
import { useAuth } from 'front/components/index/atoms';
import React, { useMemo } from 'react';
import { IScheduleWidgetRole, ScheduleRoleScopeProps, scheduleWidgetUserRights } from 'shared/api';
import { ScheduleWidgetRoleFace } from './RoleFace';

const mainRoleRights = scheduleWidgetUserRights.getAllRights();
const LazyIconConfigurator = React.lazy(() => import('../../../../shared/ui/configurators/Icon'));

const isUserSetModalOpenAtom = atom(false);
const isCatSetModalOpenAtom = atom(false);
const isCatRedactModalOpenAtom = atom(false);

export function ScheduleWidgetRole({ role }: { role: IScheduleWidgetRole }) {
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
    <div className="flex flex-gap between margin-gap">
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
          <div className="flex">
            Роль <span className="color--7">{role.title}</span> займёт
          </div>
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
                confirm={`Теперь ${user?.fio || user?.nick} займёт роль ${role.title}?`}
                className="flex flex-gap pointer"
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
            <span>
              <span className="color--7">{role.title}</span> в категорию
            </span>

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
                    className="flex flex-gap pointer margin-gap"
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
        <ModalHeader>Редактирование роли {role.title}</ModalHeader>
        <ModalBody>
          <StrongEditableField
            isRedact
            title="Название"
            icon="SchoolReportCard"
            value={role}
            fieldKey="title"
            postfix={roleUser && ' - ' + (roleUser.fio || roleUser.nick)}
            onSend={value => schRolesTsjrpcClient.setRoleTitle({ props: roleScopeProps, value, prevTitle: role.title })}
          />
          <LazyIconConfigurator
            header={`Иконка для роли ${role.title}`}
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
                  confirm={
                    <>
                      <span className="color--7">{roleUser.fio || roleUser.nick} </span>
                      больше не
                      <span className="color--7"> {role.title}</span>?
                    </>
                  }
                  postfix="Освободить роль"
                  className="flex-max margin-gap-v"
                  onSend={() => schRolesTsjrpcClient.makeFreeRole({ props: roleScopeProps, value: role.title })}
                />
              )}
              {roleUser ? (
                <TheIconButton
                  icon="ArrowReloadHorizontal"
                  onClick={isUserSetModalOpenAtom.do.toggle}
                  postfix="Заменить человека"
                  className="flex-max margin-gap-v"
                />
              ) : (
                <TheIconButton
                  icon="UserAdd01"
                  onClick={isUserSetModalOpenAtom.do.toggle}
                  postfix="Назначить человека"
                  className="flex-max margin-gap-v"
                />
              )}
              {role.mi > 0 && (
                <TheIconButton
                  icon="GridView"
                  onClick={isCatSetModalOpenAtom.do.toggle}
                  postfix={`Категория ${rights.schedule.ctrl.cats[role.cati || 0] || 'Основное'}`}
                  className="flex-max margin-gap-v"
                />
              )}
            </>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
