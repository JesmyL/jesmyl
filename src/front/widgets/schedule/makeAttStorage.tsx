import { appAttsStore } from '#basis/lib/appScheduleAttrsStorage';
import { IScheduleWidget } from 'shared/api';
import { checkIsArray } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { ScheduleKeyValueListAtt } from './atts/attachments/key-value/KeyValueListAtt/Att';
import { scheduleOwnAtts } from './atts/attachments/ownAtts';
import { ScheduleWidgetAppAtts, ScheduleWidgetAttRefs } from './ScheduleWidget.model';

export const makeAttStorage = (schedule?: IScheduleWidget): [ScheduleWidgetAppAtts<'SCH'>, ScheduleWidgetAttRefs] => {
  const atts: ScheduleWidgetAppAtts<'SCH'> = {};

  const attRefs: ScheduleWidgetAttRefs = {};

  schedule?.days.forEach(day => {
    day.list.forEach(event => {
      if (event.atts)
        forEachObjectEntries(event.atts, (attKey, att) => {
          if (!checkIsArray(att)) (attRefs[attKey] ??= []).push([day.i, event.mi]);
        });
    });
  });

  schedule?.tatts.forEach(att => {
    atts[`[SCH]:custom:${att.mi}`] = {
      ...att,
      isCustomize: true,
      useActionPanelNode: () => null,
      result: (value, dayEventAttScopeProps, isRedact) => (
        <ScheduleKeyValueListAtt
          isRedact={isRedact}
          att={att}
          value={value}
          dayEventAttScopeProps={{ ...dayEventAttScopeProps, attTitle: att.title }}
        />
      ),
      ExtRoute: () => <></>,
    };
  });
  return [{ ...appAttsStore, ...scheduleOwnAtts, ...atts }, attRefs];
};
