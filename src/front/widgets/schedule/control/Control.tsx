import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { SendableDropdown } from '#shared/ui/sends/dropdown/SendableDropdown';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom } from 'atomaric';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRegisterType } from './RegisterType';
import { ScheduleWidgetUserAddByExcel } from './users/excel/AddByExcel';
import { ScheduleWidgetUserList } from './users/UserList';

const tgInformTimesItems = [
  { title: 'Напоминать только по началу', id: 0 },
  ...[5, 10, 15, 30].map(time => ({ title: 'Напоминать TG за ' + time + ' мин.', id: time })),
];

const isModalOpenAtom = atom(false);

export const ScheduleWidgetControl = () => {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      {rights.isCanRedact ? (
        <TheIconButton
          icon="Settings01"
          postfix={
            <>
              Управление <LazyIcon icon="ArrowRight01" />
            </>
          }
          onClick={isModalOpenAtom.toggle}
          className="margin-gap-v flex-max"
        />
      ) : (
        <TheIconButton
          icon="User"
          postfix={
            <>
              Участники <LazyIcon icon="ArrowRight01" />
            </>
          }
          onClick={isModalOpenAtom.toggle}
          className="margin-gap-v flex-max"
        />
      )}

      <Modal openAtom={isModalOpenAtom}>
        {rights.isCanRedact ? (
          <>
            <ModalHeader>
              Управление <span className="color--7">{rights.schedule.title}</span>
            </ModalHeader>

            <ModalBody>
              <ScheduleWidgetUserList
                titlePostfix={rights.isCanRedactUsers && (isExpand => isExpand && <ScheduleWidgetUserAddByExcel />)}
              />
              <ScheduleWidgetRegisterType />
              {rights.isCanTotalRedact && (
                <>
                  <TheIconSendButton
                    icon={rights.schedule.withTech ? 'CheckmarkSquare02' : 'Square'}
                    postfix="Первый - технический день"
                    confirm={`Сделать первый день ${rights.schedule.withTech ? 'обычным' : 'подготовительным'}?`}
                    className="margin-gap-b"
                    onSend={() =>
                      schGeneralTsjrpcClient.setFirstDayAsTech({
                        props: scheduleScopeProps,
                        value: rights.schedule.withTech ? undefined : 1,
                      })
                    }
                  />
                  <StrongEditableField
                    value={rights.schedule.tgChatReqs}
                    isRedact
                    setSelfRedact
                    title="TG-чат-реквизиты"
                    onSend={value => schGeneralTsjrpcClient.setTgChatRequisites({ props: scheduleScopeProps, value })}
                  />
                  <TheIconSendButton
                    className="margin-gap-b"
                    icon={rights.schedule.tgInform === 0 ? 'NotificationOff01' : 'Notification01'}
                    postfix={
                      rights.schedule.tgInform === 0
                        ? 'TG-Напоминание: отключено'
                        : rights.schedule.tgInformTime
                          ? 'TG-Напоминание: за ' + rights.schedule.tgInformTime + ' мин. и в начале события'
                          : 'TG-Напоминание: только по началу события'
                    }
                    onSend={() =>
                      schGeneralTsjrpcClient.toggleIsTgInform({
                        props: scheduleScopeProps,
                        value: undefined,
                      })
                    }
                  />
                  <SendableDropdown
                    items={tgInformTimesItems}
                    disabled={rights.schedule.tgInform === 0}
                    id={rights.schedule.tgInformTime}
                    className="margin-big-gap-b"
                    onSend={tm => schGeneralTsjrpcClient.setTgInformTime({ props: scheduleScopeProps, value: tm })}
                  />
                </>
              )}
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>Участники</ModalHeader>
            <ModalBody>
              {rights.schedule.ctrl.users.map(user => {
                if (!user.R || user.login === undefined) return null;
                return (
                  <div
                    key={user.mi}
                    className="margin-gap-v"
                  >
                    {user.fio && user.fio !== user.nick ? `${user.fio} (${user.nick})` : user.nick}
                  </div>
                );
              })}
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  );
};
