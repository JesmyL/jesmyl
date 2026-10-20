import { translateBase } from '#basis/locale';
import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import {
  ScheduleWidgetAppAttCheckListValueItem,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';

import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleCheckListAtt } from './TheCheckListAtt';

export interface ScheduleChListAtt {
  list: ScheduleWidgetAppAttCheckListValueItem[];
}

export const makeCheckListAtt = (): ScheduleWidgetAppAtts<'SCH', ScheduleChListAtt> => ({
  '[SCH]:chlist': {
    title: translateBase(BaseLocaleKey.ScheduleExecute),
    description: translateBase(BaseLocaleKey.ScheduleChecklistDescription),
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
    ExtRoute: () => <></>,
    useActionPanelNode: () => null,
  },
});
