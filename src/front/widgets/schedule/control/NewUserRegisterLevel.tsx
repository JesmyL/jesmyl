import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom } from 'atomaric';
import { scheduleWidgetUserRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRightControlList } from './RightControlList';

const isModalOpenAtom = atom(false);

export function ScheduleWidgetNewUserRegisterLevel() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <TheIconButton
        icon="ArrowRight01"
        className="my-5 ml-2"
        prefix="Права по умолчанию"
        onClick={isModalOpenAtom.do.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
        <ModalBody>
          <ScheduleWidgetRightControlList
            rightCtrl={scheduleWidgetUserRights}
            R={rights.schedule.ctrl.defu}
            onSend={value => schGeneralTsjrpcClient.setDefaultUserRights({ props: scheduleScopeProps, R: value })}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
