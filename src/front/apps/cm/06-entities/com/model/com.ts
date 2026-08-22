import { CmComOrderWid, CmComWid, ScheduleWidgetWid } from 'shared/api';

export interface CmComOpenRouteProps {
  comw?: CmComWid;
  tran?: '-!-';
  schw?: ScheduleWidgetWid;
}

export type CmComWordFounds = PRecord<CmComWid, { ordw: CmComOrderWid; linei: number; wordi: number }[]>;
