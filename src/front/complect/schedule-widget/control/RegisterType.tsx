import { scheduleWidgetRegTypeRights } from 'shared/api';
import useIsExpand from '../../expand/useIsExpand';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
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
              // scope={scope}
              // fieldName="type"
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
