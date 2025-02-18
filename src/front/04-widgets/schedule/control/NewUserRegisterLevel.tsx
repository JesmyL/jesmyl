import { schGeneralSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { Modal, ModalBody } from '#shared/ui/modal';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { useState } from 'react';
import { scheduleWidgetUserRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetRightControlList from './RightControlList';

export default function ScheduleWidgetNewUserRegisterLevel() {
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
}
