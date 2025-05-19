import { appAttsStore } from '#basis/lib/appScheduleAttrsStorage';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { IScheduleWidget } from 'shared/api';
import { ScheduleKeyValueListAtt } from './atts/attachments/key-value/KeyValueListAtt';
import { scheduleOwnAtts } from './atts/attachments/ownAtts';
import { ScheduleWidgetAppAtts, ScheduleWidgetAttRefs } from './ScheduleWidget.model';

export const makeAttStorage = (schedule?: IScheduleWidget): [ScheduleWidgetAppAtts<'SCH'>, ScheduleWidgetAttRefs] => {
  const atts: ScheduleWidgetAppAtts<'SCH'> = {};

  const attRefs: ScheduleWidgetAttRefs = {};

  schedule?.days.forEach(day => {
    day.list.forEach(event => {
      if (event.atts)
        MyLib.entries(event.atts).forEach(([attKey, att]) => {
          if (!mylib.isArr(att)) (attRefs[attKey] ??= []).push([day.mi, event.mi]);
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
