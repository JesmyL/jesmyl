import { atom } from '#shared/lib/atom';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { scheduleWidgetUserRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetRightControlList } from './RightControlList';

const isModalOpenAtom = atom(false);

export function ScheduleWidgetNewUserRegisterLevel() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <TheIconButton
        icon="ArrowRight01"
        className="margin-big-gap-v margin-gap-l"
        prefix="Права по умолчанию"
        onClick={isModalOpenAtom.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalBody>
          <ScheduleWidgetRightControlList
            rightCtrl={scheduleWidgetUserRights}
            R={rights.schedule.ctrl.defu}
            onSend={value =>
              schGeneralSokiInvocatorClient.setDefaultUserRights({ props: scheduleScopeProps, R: value })
            }
          />
        </ModalBody>
      </Modal>
    </>
  );
}
