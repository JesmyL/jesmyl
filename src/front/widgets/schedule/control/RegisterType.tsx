import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { scheduleWidgetRegTypeRights } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetNewUserRegisterLevel } from './NewUserRegisterLevel';
import { ScheduleWidgetRightControlList } from './RightControlList';

export function ScheduleWidgetRegisterType() {
  const rights = useScheduleWidgetRightsContext();
  const [expandNode, isExpand] = useIsExpand(false, <>Тип мероприятия</>);
  const scheduleScopeProps = useScheduleScopePropsContext();

  return (
    <>
      <div className="my-2">{expandNode}</div>
      <div className="my-5">
        {isExpand && (
          <>
            <ScheduleWidgetRightControlList
              rightCtrl={scheduleWidgetRegTypeRights}
              R={rights.schedule.ctrl.type}
              className="ml-2"
              isCantEdit={!rights.isCanTotalRedact}
              isDescriptionsCollect
              onSend={value =>
                schGeneralTsjrpcClient.setScheduleRegisterType({ props: scheduleScopeProps, type: value })
              }
            />
            {rights.isCanTotalRedact && <ScheduleWidgetNewUserRegisterLevel />}
          </>
        )}
      </div>
    </>
  );
}
