import { schGeneralSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import useIsExpand from 'front/08-shared/ui/expand/useIsExpand';
import { scheduleWidgetRegTypeRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetNewUserRegisterLevel from './NewUserRegisterLevel';
import ScheduleWidgetRightControlList from './RightControlList';

export default function ScheduleWidgetRegisterType() {
  const rights = useScheduleWidgetRightsContext();
  const [expandNode, isExpand] = useIsExpand(false, <>Тип мероприятия</>);
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <div className="margin-gap-v">{expandNode}</div>
      <div className="margin-big-gap-v">
        {isExpand && (
          <>
            <ScheduleWidgetRightControlList
              rightCtrl={scheduleWidgetRegTypeRights}
              R={rights.schedule.ctrl.type}
              className="margin-gap-l"
              isCantEdit={!rights.isCanTotalRedact}
              isDescriptionsCollect
              onSend={value => schGeneralSokiInvocatorClient.setScheduleRegisterType(null, scheduleScopeProps, value)}
            />
            {rights.isCanTotalRedact && <ScheduleWidgetNewUserRegisterLevel />}
          </>
        )}
      </div>
    </>
  );
}
