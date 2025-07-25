import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { scheduleWidgetRegTypeRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
import { ScheduleWidgetNewUserRegisterLevel } from './NewUserRegisterLevel';
import { ScheduleWidgetRightControlList } from './RightControlList';

export function ScheduleWidgetRegisterType() {
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
              onSend={value =>
                schGeneralSokiInvocatorClient.setScheduleRegisterType({ props: scheduleScopeProps, type: value })
              }
            />
            {rights.isCanTotalRedact && <ScheduleWidgetNewUserRegisterLevel />}
          </>
        )}
      </div>
    </>
  );
}
