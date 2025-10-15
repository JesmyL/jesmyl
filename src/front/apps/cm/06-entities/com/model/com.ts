import { CmComWid } from 'shared/api';

export interface CmComOpenRouteProps {
  comw?: CmComWid;
  tran?: '-!-';
}

export type CmComOpenLinkRenderer = (props: {
  children: React.ReactNode;
  search: CmComOpenRouteProps;
  linkRef?: React.RefObject<HTMLAnchorElement | null>;
}) => React.ReactNode;
