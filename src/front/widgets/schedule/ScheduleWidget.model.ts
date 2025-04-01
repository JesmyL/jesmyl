/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, ReactNode } from 'react';
import {
  AttKey,
  IScheduleWidget,
  IScheduleWidgetDayEventMi,
  IScheduleWidgetWid,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttBasic,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttRef,
} from 'shared/api';

export type ScheduleWidgetAttRefs = Record<ScheduleWidgetAttKey<AttKey>, ScheduleWidgetAttRef[]>;

export type ScheduleWidgetAppAtts<AttAppName extends AttKey = AttKey, AttValue = any> = Record<
  ScheduleWidgetAttKey<AttAppName>,
  ScheduleWidgetAppAtt<AttValue>
>;

export interface ScheduleDayEventPathProps {
  schw?: IScheduleWidgetWid;
  dayi?: number;
  eventMi?: IScheduleWidgetDayEventMi;
}

export type ScheduleWidgetAppAttResultItem<AttValue> = (mpValue: () => AttValue, content: ReactNode) => JSX.Element;

export interface ScheduleWidgetAppAtt<AttValue = any> extends ScheduleWidgetAppAttBasic<AttValue> {
  result: (
    value: AttValue,
    dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps,
    isRedact: boolean,
    switchIsRedact: (isRedact?: boolean) => void,
    schedule: IScheduleWidget,
  ) => ReactNode;

  useActionPanelNode: (
    scopeProps: ScheduleDayEventAttachmentScopeProps,
    editIconNode: React.ReactNode,
    isCanRedact: boolean,
    isExpand: boolean,
  ) => React.ReactNode;

  ExtRoute: (props: OmitOwn<ScheduleDayEventAttachmentScopeProps, 'attTitle'>) => JSX.Element;
}
