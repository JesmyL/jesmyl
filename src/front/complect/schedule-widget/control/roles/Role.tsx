import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalFooter } from 'front/complect/modal/Modal/ModalFooter';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import React, { useMemo, useState } from 'react';
import { IScheduleWidgetRole, ScheduleRoleScopeProps, scheduleWidgetUserRights } from 'shared/api';
import { useAuth } from '../../../../components/index/atoms';
import StrongEditableField from '../../../strong-control/field/StrongEditableField';
import IconButton from '../../../the-icon/IconButton';
import useIsRedactArea from '../../../useIsRedactArea';
import { useScheduleScopePropsContext } from '../../complect/scope-contexts/scope-props-contexts';
import { schRolesSokiInvocatorClient } from '../../invocators/invocators.methods';
import { extractScheduleWidgetRoleUser, useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetRoleFace from './RoleFace';

const mainRoleRights = scheduleWidgetUserRights.getAllRights();
const LazyIconConfigurator = React.lazy(() => import('../../../configurators/Icon'));

export default function ScheduleWidgetRole({ role }: { role: IScheduleWidgetRole }) {
  const rights = useScheduleWidgetRightsContext();
  const auth = useAuth();
  const roleUser = extractScheduleWidgetRoleUser(rights.schedule, 0, role);
  const catsRedact = useIsRedactArea(true, null, true, true);
  const scheduleScopeProps = useScheduleScopePropsContext();
  const roleScopeProps: ScheduleRoleScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, roleMi: role.mi }),
    [role.mi, scheduleScopeProps],
  );

  const [isUserSetModalOpen, setIsUserSetModalOpen] = useState<unknown>(false);
  const [isCatSetModalOpen, setIsCatSetModalOpen] = useState<unknown>(false);
  const [isCatRedactModalOpen, setIsCatRedactModalOpen] = useState<unknown>(false);

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
          onClick={setIsCatRedactModalOpen}
        />
      )}

      {!isUserSetModalOpen || (
        <Modal onClose={setIsUserSetModalOpen}>
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
                  onSuccess={() => setIsUserSetModalOpen(false)}
                  onSend={() =>
                    schRolesSokiInvocatorClient.setRoleUser(
                      null,
                      roleScopeProps,
                      user.mi,
                      role.title,
                      user.fio ?? user.nick ?? '?',
                    )
                  }
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}

      {!isCatSetModalOpen || (
        <Modal onClose={setIsCatSetModalOpen}>
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
                        schRolesSokiInvocatorClient.setRoleCategoryTitle(
                          null,
                          scheduleScopeProps,
                          catNamei,
                          value,
                          catName,
                        )
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
                      onSuccess={() => setIsCatSetModalOpen(false)}
                      onSend={() =>
                        schRolesSokiInvocatorClient.setCategoryForRole(
                          null,
                          roleScopeProps,
                          catNamei,
                          role.title,
                          catName,
                        )
                      }
                    />
                  );
                })}
          </ModalBody>
          <ModalFooter>
            {!rights.schedule.ctrl.cats.includes('') && catsRedact.isRedact && (
              <TheIconSendButton
                icon="FolderAdd"
                onSend={() => schRolesSokiInvocatorClient.addRoleCategory(null, roleScopeProps)}
              />
            )}
          </ModalFooter>
        </Modal>
      )}

      {!isCatRedactModalOpen || (
        <Modal onClose={setIsCatRedactModalOpen}>
          <ModalHeader>Редактирование роли {role.title}</ModalHeader>
          <ModalBody>
            <StrongEditableField
              isRedact
              title="Название"
              icon="SchoolReportCard"
              value={role}
              fieldKey="title"
              postfix={roleUser && ' - ' + (roleUser.fio || roleUser.nick)}
              onSend={value => schRolesSokiInvocatorClient.setRoleTitle(null, roleScopeProps, value, role.title)}
            />
            <LazyIconConfigurator
              header={`Иконка для роли ${role.title}`}
              icon={role.icon ?? 'Github01'}
              used={rights.schedule.ctrl.roles.map(role => role.icon)}
              onSend={icon => schRolesSokiInvocatorClient.setRoleIcon(null, roleScopeProps, icon, role.title)}
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
                    onSend={() => schRolesSokiInvocatorClient.makeFreeRole(null, roleScopeProps, role.title)}
                  />
                )}
                {roleUser ? (
                  <IconButton
                    icon="ArrowReloadHorizontal"
                    onClick={setIsUserSetModalOpen}
                    postfix="Заменить человека"
                    className="flex-max margin-gap-v"
                  />
                ) : (
                  <IconButton
                    icon="UserAdd01"
                    onClick={setIsUserSetModalOpen}
                    postfix="Назначить человека"
                    className="flex-max margin-gap-v"
                  />
                )}
                {role.mi > 0 && (
                  <IconButton
                    icon="GridView"
                    onClick={setIsCatSetModalOpen}
                    postfix={`Категория ${rights.schedule.ctrl.cats[role.cati || 0] || 'Основное'}`}
                    className="flex-max margin-gap-v"
                  />
                )}
              </>
            )}
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}
