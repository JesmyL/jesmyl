import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { IconArrowRight01StrokeRounded } from '../../../complect/the-icon/icons/arrow-right-01';
import { IconCheckmarkSquare02StrokeRounded } from '../../../complect/the-icon/icons/checkmark-square-02';
import { IconNotification01StrokeRounded } from '../../../complect/the-icon/icons/notification-01';
import { IconNotificationOff01StrokeRounded } from '../../../complect/the-icon/icons/notification-off-01';
import { IconSettings01StrokeRounded } from '../../../complect/the-icon/icons/settings-01';
import { IconSquareStrokeRounded } from '../../../complect/the-icon/icons/square';
import { IconUserStrokeRounded } from '../../../complect/the-icon/icons/user';
import useModal from '../../modal/useModal';
import SendableDropdown from '../../sends/dropdown/SendableDropdown';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import IconButton from '../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/useScheduleScopePropsContext';
import { schSokiInvocatorClient } from '../invocators/invocators.methods';
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
                <EvaSendButton
                  Icon={rights.schedule.withTech ? IconCheckmarkSquare02StrokeRounded : IconSquareStrokeRounded}
                  postfix="Первый - технический день"
                  confirm={`Сделать первый день ${rights.schedule.withTech ? 'обычным' : 'подготовительным'}?`}
                  className="margin-gap-b"
                  onSend={() =>
                    schSokiInvocatorClient.setFirstDayAsTech(
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
                  onSend={value => schSokiInvocatorClient.setTgChatRequisites(null, scheduleScopeProps, value)}
                />
                <EvaSendButton
                  className="margin-gap-b"
                  Icon={
                    rights.schedule.tgInform === 0
                      ? IconNotificationOff01StrokeRounded
                      : IconNotification01StrokeRounded
                  }
                  postfix={
                    rights.schedule.tgInform === 0
                      ? 'TG-Напоминание: отключено'
                      : rights.schedule.tgInformTime
                        ? 'TG-Напоминание: за ' + rights.schedule.tgInformTime + ' мин. и в начале события'
                        : 'TG-Напоминание: только по началу события'
                  }
                  onSend={() => schSokiInvocatorClient.toggleIsTgInform(null, scheduleScopeProps)}
                />
                <SendableDropdown
                  items={tgInformTimesItems}
                  disabled={rights.schedule.tgInform === 0}
                  id={rights.schedule.tgInformTime}
                  className="margin-big-gap-b"
                  onSend={tm => schSokiInvocatorClient.setTgInformTime(null, scheduleScopeProps, tm)}
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
          Icon={IconSettings01StrokeRounded}
          postfix={
            <>
              Управление <IconArrowRight01StrokeRounded />
            </>
          }
          onClick={screen}
          className="margin-gap-v flex-max"
        />
      ) : (
        <IconButton
          Icon={IconUserStrokeRounded}
          postfix={
            <>
              Участники <IconArrowRight01StrokeRounded />
            </>
          }
          onClick={screen}
          className="margin-gap-v flex-max"
        />
      )}
    </>
  );
};
