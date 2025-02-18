import { schGeneralSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { useModal } from '#shared/ui/modal';
import SendableDropdown from 'front/08-shared/ui/sends/dropdown/SendableDropdown';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import StrongEditableField from '../strong-control/field/StrongEditableField';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetRegisterType from './RegisterType';
import { ScheduleWidgetUserAddByExcel } from './users/excel/AddByExcel';
import ScheduleWidgetUserList from './users/UserList';

const tgInformTimesItems = [
  { title: 'Напоминать только по началу', id: 0 },
  ...[5, 10, 15, 30].map(time => ({ title: 'Напоминать TG за ' + time + ' мин.', id: time })),
];

export const ScheduleWidgetControl = () => {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const [modalNode, screen] = useModal(({ header, body }) => {
    return rights.isCanRedact ? (
      <>
        {header(
          <>
            Управление <span className="color--7">{rights.schedule.title}</span>
          </>,
        )}
        {body(
          <>
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
                    schGeneralSokiInvocatorClient.setFirstDayAsTech(
                      null,
                      scheduleScopeProps,
                      rights.schedule.withTech ? undefined : 1,
                    )
                  }
                />
                <StrongEditableField
                  value={rights.schedule.tgChatReqs}
                  isRedact
                  setSelfRedact
                  title="TG-чат-реквизиты"
                  onSend={value => schGeneralSokiInvocatorClient.setTgChatRequisites(null, scheduleScopeProps, value)}
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
                  onSend={() => schGeneralSokiInvocatorClient.toggleIsTgInform(null, scheduleScopeProps)}
                />
                <SendableDropdown
                  items={tgInformTimesItems}
                  disabled={rights.schedule.tgInform === 0}
                  id={rights.schedule.tgInformTime}
                  className="margin-big-gap-b"
                  onSend={tm => schGeneralSokiInvocatorClient.setTgInformTime(null, scheduleScopeProps, tm)}
                />
              </>
            )}
          </>,
        )}
      </>
    ) : (
      <>
        {header(<div>Участники</div>)}
        {body(
          rights.schedule.ctrl.users.map(user => {
            if (!user.R || user.login === undefined) return null;
            return (
              <div
                key={user.mi}
                className="margin-gap-v"
              >
                {user.fio && user.fio !== user.nick ? `${user.fio} (${user.nick})` : user.nick}
              </div>
            );
          }),
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      {rights.isCanRedact ? (
        <IconButton
          icon="Settings01"
          postfix={
            <>
              Управление <LazyIcon icon="ArrowRight01" />
            </>
          }
          onClick={screen}
          className="margin-gap-v flex-max"
        />
      ) : (
        <IconButton
          icon="User"
          postfix={
            <>
              Участники <LazyIcon icon="ArrowRight01" />
            </>
          }
          onClick={screen}
          className="margin-gap-v flex-max"
        />
      )}
    </>
  );
};
