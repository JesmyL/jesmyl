import { ReactNode } from 'react';
import {
  AttKey,
  IScheduleWidget,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttBasic,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttRef,
} from 'shared/api';

export type ScheduleWidgetAttRefs = Record<ScheduleWidgetAttKey<AttKey>, ScheduleWidgetAttRef[]>;

export type ScheduleWidgetAppAtts<AttAppName extends AttKey = AttKey, AttValue extends any = any> = Record<
  ScheduleWidgetAttKey<AttAppName>,
  ScheduleWidgetAppAtt<AttValue>
>;

export type ScheduleWidgetAppAttResultItem<AttValue extends any> = (
  mpValue: () => AttValue,
  content: ReactNode,
) => JSX.Element;

export interface ScheduleWidgetAppAtt<AttValue extends any = any> extends ScheduleWidgetAppAttBasic<AttValue> {
  result: (
    value: AttValue,
    dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
    isRedact: boolean,
    switchIsRedact: (isRedact?: boolean) => void,
    schedule: IScheduleWidget,
  ) => ReactNode;
}
