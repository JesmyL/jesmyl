import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalFooter } from 'front/complect/modal/Modal/ModalFooter';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import React, { useMemo, useState } from 'react';
import { IScheduleWidgetRole, ScheduleRoleScopeProps, scheduleWidgetUserRights } from 'shared/api';
import { IconArrowReloadHorizontalStrokeRounded } from '../../../../complect/the-icon/icons/arrow-reload-horizontal';
import { IconEdit01StrokeRounded } from '../../../../complect/the-icon/icons/edit-01';
import { IconFolder01StrokeRounded } from '../../../../complect/the-icon/icons/folder-01';
import { IconFolderAddStrokeRounded } from '../../../../complect/the-icon/icons/folder-add';
import { IconGridViewStrokeRounded } from '../../../../complect/the-icon/icons/grid-view';
import { IconSchoolReportCardStrokeRounded } from '../../../../complect/the-icon/icons/school-report-card';
import { IconUserStrokeRounded } from '../../../../complect/the-icon/icons/user';
import { IconUserAdd01StrokeRounded } from '../../../../complect/the-icon/icons/user-add-01';
import { IconUserRemove01StrokeRounded } from '../../../../complect/the-icon/icons/user-remove-01';
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
        <IconButton
          Icon={IconEdit01StrokeRounded}
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
                <EvaSendButton
                  key={useri}
                  confirm={`Теперь ${user?.fio || user?.nick} займёт роль ${role.title}?`}
                  className="flex flex-gap pointer"
                  Icon={IconUserStrokeRounded}
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
                    <EvaSendButton
                      key={catNamei}
                      className="flex flex-gap pointer margin-gap"
                      Icon={IconFolder01StrokeRounded}
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
              <EvaSendButton
                Icon={IconFolderAddStrokeRounded}
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
              Icon={IconSchoolReportCardStrokeRounded}
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
                  <EvaSendButton
                    Icon={IconUserRemove01StrokeRounded}
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
                    Icon={IconArrowReloadHorizontalStrokeRounded}
                    onClick={setIsUserSetModalOpen}
                    postfix="Заменить человека"
                    className="flex-max margin-gap-v"
                  />
                ) : (
                  <IconButton
                    Icon={IconUserAdd01StrokeRounded}
                    onClick={setIsUserSetModalOpen}
                    postfix="Назначить человека"
                    className="flex-max margin-gap-v"
                  />
                )}
                {role.mi > 0 && (
                  <IconButton
                    Icon={IconGridViewStrokeRounded}
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
