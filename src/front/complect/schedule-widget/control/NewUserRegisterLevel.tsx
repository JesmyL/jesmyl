import { IconButton } from '#shared/ui/icon';
import { Modal, ModalBody } from '#shared/ui/modal';
import { useState } from 'react';
import { scheduleWidgetUserRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetRightControlList } from './RightControlList';

export const ScheduleWidgetNewUserRegisterLevel = () => {
  const rights = useScheduleWidgetRightsContext();
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <IconButton
        icon="ArrowRight01"
        className="margin-big-gap-v margin-gap-l"
        prefix="Права по умолчанию"
        onClick={setIsOpenModal}
      />

      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <ModalBody>
            <ScheduleWidgetRightControlList
              rightCtrl={scheduleWidgetUserRights}
              R={rights.schedule.ctrl.defu}
              onSend={value => schGeneralSokiInvocatorClient.setDefaultUserRights(null, scheduleScopeProps, value)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
