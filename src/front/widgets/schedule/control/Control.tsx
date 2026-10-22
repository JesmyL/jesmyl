import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { SendableDropdown } from '#shared/ui/sends/dropdown/SendableDropdown';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { Atom, atom } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { takeScheduleWidgetUserName } from '../useScheduleWidget';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRegisterType } from './RegisterType';
import { ScheduleWidgetUserAddByExcel } from './users/excel/AddByExcel';
import { ScheduleWidgetUserList } from './users/UserList';

let isModalOpenAtom: Atom<boolean>;

export const ScheduleWidgetControl = () => {
  isModalOpenAtom ??= atom(false);

  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const tgInformTimesItems = [
    { title: translateBase(BaseLocaleKey.ScheduleInformOnlyByStart), id: 0 },
    ...[5, 10, 15, 30].map(time => ({
      title: translateBase(BaseLocaleKey.ScheduleInformTelegramBefore, { num: time }),
      id: time,
    })),
  ];

  return (
    <>
      {rights.isCanRedact ? (
        <TheIconButton
          icon="Settings01"
          postfix={
            <>
              {translateBase(BaseLocaleKey.Control)} <LazyIcon icon="ArrowRight01" />
            </>
          }
          onClick={isModalOpenAtom.do.toggle}
          className="my-2 flex-max"
        />
      ) : (
        <TheIconButton
          icon="User"
          postfix={
            <>
              {translateBase(BaseLocaleKey.ScheduleMembers)} <LazyIcon icon="ArrowRight01" />
            </>
          }
          onClick={isModalOpenAtom.do.toggle}
          className="my-2 flex-max"
        />
      )}

      <Modal openAtom={isModalOpenAtom}>
        {rights.isCanRedact ? (
          <>
            <ModalHeader>
              {translateBase(BaseLocaleKey.Control)} <span className="text-x7">{rights.schedule.title}</span>
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
                    postfix={translateBase(BaseLocaleKey.ScheduleFirstIsTechDay)}
                    confirm={
                      rights.schedule.withTech
                        ? translateBase(BaseLocaleKey.ScheduleMakeFirstDayUsual)
                        : translateBase(BaseLocaleKey.ScheduleFirstDayPrep)
                    }
                    className="mb-2"
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
                    isSelfRedact
                    title={translateBase(BaseLocaleKey.ScheduleTelegramChatDetails)}
                    onSend={value => schGeneralTsjrpcClient.setTgChatRequisites({ props: scheduleScopeProps, value })}
                  />
                  <TheIconSendButton
                    className="mb-2"
                    icon={rights.schedule.tgInform === 0 ? 'NotificationOff01' : 'Notification01'}
                    postfix={
                      rights.schedule.tgInform === 0
                        ? translateBase(BaseLocaleKey.ScheduleTelegramInformOff)
                        : rights.schedule.tgInformTime
                          ? translateBase(BaseLocaleKey.ScheduleTelegramBeforeAndStart, {
                              num: rights.schedule.tgInformTime,
                            })
                          : translateBase(BaseLocaleKey.ScheduleTelegramInformOnlyStart)
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
                    className="mb-5"
                    onSend={tm => schGeneralTsjrpcClient.setTgInformTime({ props: scheduleScopeProps, value: tm })}
                  />
                </>
              )}
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>{translateBase(BaseLocaleKey.ScheduleMembers)}</ModalHeader>
            <ModalBody>
              {rights.schedule.ctrl.users.map(user => {
                if (!user.R) return null;
                return (
                  <div
                    key={user.mi}
                    className="my-2"
                  >
                    {takeScheduleWidgetUserName(rights, user)}
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
