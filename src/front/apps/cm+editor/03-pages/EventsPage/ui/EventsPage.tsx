import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { schGeneralTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { useIndexSchedules, useUserInfoDict } from '$index/shared/state';
import { useEffect, useRef, useState } from 'react';
import {
  IScheduleWidget,
  IScheduleWidgetComsRights,
  IScheduleWidgetDayEvent,
  ScheduleWidgetWid,
  UserId,
} from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeCmEditorEventsComsRightsValue, takeCmEditorEventsDayi } from '../lib/coms-rights';
import { CmEditorEventsComsRightsScope } from '../model';
import { CmEditorEventsComsRightsUsersList } from './CmEditorEventsComsRightsUsersList';

const makeDayTitle = (schedule: IScheduleWidget, dayi: number) =>
  schedule.withTech && dayi === 0
    ? translateBase(BaseLocaleKey.SchedulePreparation)
    : translateBase(BaseLocaleKey.ScheduleDayNumber, { n: schedule.withTech ? dayi : dayi + 1 });

const makeEventTitle = (schedule: IScheduleWidget, event: IScheduleWidgetDayEvent) => {
  const typeTitle = schedule.types[event.type]?.title || translateBase(BaseLocaleKey.ScheduleEvent);

  return event.topic ? `${typeTitle}: ${event.topic}` : typeTitle;
};

export const CmEditorEventsPage = () => {
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCanUpdate = checkAccess('cm', 'EVENT', 'U');
  const schedules = useIndexSchedules();
  const [schw, setSchw] = useState<ScheduleWidgetWid | nil>(null);
  const schedule = schedules?.find(sch => sch.w === schw) ?? schedules?.at(0);
  const { byId } = useUserInfoDict();
  const [comsRights, setComsRights] = useState<IScheduleWidgetComsRights | nil>(null);
  const comsRightsRef = useRef(comsRights);
  const sendingCountRef = useRef(0);

  useEffect(() => {
    if (sendingCountRef.current) return;

    const value = schedule?.ctrl.comsRights ?? null;

    comsRightsRef.current = value;
    setComsRights(value);
  }, [schedule?.w, schedule?.ctrl.comsRights]);

  const sendComsRights = async (scope: CmEditorEventsComsRightsScope, userIds: UserId[]) => {
    if (!schedule) return;

    const previous = comsRightsRef.current;
    const value = makeCmEditorEventsComsRightsValue(previous, scope, userIds);

    comsRightsRef.current = value;
    setComsRights(value);
    sendingCountRef.current++;

    try {
      const updated = await schGeneralTsjrpcClient.setComsRights({ props: { schw: schedule.w }, value });

      if (comsRightsRef.current !== value) return;

      const actual = updated.ctrl.comsRights ?? null;

      comsRightsRef.current = actual;
      setComsRights(actual);
    } catch (error) {
      if (comsRightsRef.current === value) {
        comsRightsRef.current = previous;
        setComsRights(previous);
      }

      throw error;
    } finally {
      sendingCountRef.current--;
    }
  };

  return (
    <PageCmEditorContainer
      className="cm-editor-events-coms-rights"
      contentClass="pl-4"
      headTitle={translateBase(BaseLocaleKey.Events)}
      content={
        <>
          <div className="flex gap-2 items-center my-3">
            <Dropdown
              label={translateBase(BaseLocaleKey.ScheduleEventPlural)}
              id={schedule?.w ?? null}
              items={
                schedules?.map(sch => ({
                  id: sch.w,
                  title: sch.title || translateBase(BaseLocaleKey.ScheduleUntitled),
                })) ?? []
              }
              onSelectId={schw => setSchw(schw)}
            />
          </div>
          {!schedule && <div className="text-x7">{translateBase(BaseLocaleKey.EmptyList)}</div>}
          {schedule && (
            <>
              <h3 className="font-bold my-3">{translateBase(BaseLocaleKey.ScheduleRightRedactComsList)}</h3>
              <CmEditorEventsComsRightsUsersList
                title={translateBase(BaseLocaleKey.ScheduleMembers)}
                userIds={comsRights?.users ?? []}
                userInfoById={byId}
                isCanUpdate={isCanUpdate}
                onChange={userIds => sendComsRights({ scope: 'users' }, userIds)}
              />

              {schedule.days.flatMap((day, index) => {
                if (!day.list.length) return [];

                const dayi = takeCmEditorEventsDayi(index);

                return (
                  <div
                    key={dayi}
                    className="ml-4"
                  >
                    <ExpandableContent
                      icon="Calendar03"
                      title={makeDayTitle(schedule, dayi)}
                    >
                      <CmEditorEventsComsRightsUsersList
                        title={translateBase(BaseLocaleKey.ScheduleMembers)}
                        userIds={comsRights?.days?.[dayi] ?? []}
                        userInfoById={byId}
                        isCanUpdate={isCanUpdate}
                        onChange={userIds => sendComsRights({ scope: 'day', dayi }, userIds)}
                      />

                      {day.list.map(event => (
                        <div
                          key={event.mi}
                          className="ml-4"
                        >
                          <ExpandableContent
                            icon="Playlist02"
                            title={makeEventTitle(schedule, event)}
                          >
                            <CmEditorEventsComsRightsUsersList
                              title={translateBase(BaseLocaleKey.ScheduleMembers)}
                              userIds={comsRights?.events?.[dayi]?.[event.mi] ?? []}
                              userInfoById={byId}
                              isCanUpdate={isCanUpdate}
                              onChange={userIds => sendComsRights({ scope: 'event', dayi, eventMi: event.mi }, userIds)}
                            />
                          </ExpandableContent>
                        </div>
                      ))}
                    </ExpandableContent>
                  </div>
                );
              })}
            </>
          )}
        </>
      }
    />
  );
};
