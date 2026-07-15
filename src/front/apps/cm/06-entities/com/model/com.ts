import { CmComOrderWid, CmComWid, ScheduleWidgetWid } from 'shared/api';

export interface CmComOpenRouteProps {
  comw?: CmComWid;
  tran?: '-!-';
  schw?: ScheduleWidgetWid;
}

export type CmComOpenLinkRenderer = (props: {
  children: React.ReactNode;
  search: CmComOpenRouteProps;
  linkRef?: React.RefObject<HTMLAnchorElement | null>;
}) => React.ReactNode;

export type CmComWordFounds = PRecord<CmComWid, { ordw: CmComOrderWid; linei: number; wordi: number }[]>;
