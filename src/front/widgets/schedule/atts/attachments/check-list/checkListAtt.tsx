import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import {
  ScheduleWidgetAppAttCheckListValueItem,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';

import { ScheduleCheckListAtt } from './TheCheckListAtt';

export interface ScheduleChListAtt {
  list: ScheduleWidgetAppAttCheckListValueItem[];
}

export const checkListAtt: ScheduleWidgetAppAtts<'SCH', ScheduleChListAtt> = {
  '[SCH]:chlist': {
    title: 'Выполнить',
    description: 'Пункты с галочками',
    icon: 'CheckList',
    initVal: { list: [] },
    result: (value, scheduleDayEventAttachmentScopeProps, isRedact) => (
      <ScheduleCheckListAtt
        isRedact={isRedact}
        value={value}
        scheduleDayEventAttachmentScopeProps={scheduleDayEventAttachmentScopeProps}
      />
    ),
    R: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
    U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
  },
};
