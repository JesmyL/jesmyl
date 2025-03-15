import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useState } from 'react';
import { scheduleWidgetUserRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetRightControlList } from './RightControlList';

export function ScheduleWidgetNewUserRegisterLevel() {
  const rights = useScheduleWidgetRightsContext();
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <TheIconButton
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
}
