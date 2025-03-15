import { CmComWid } from 'shared/api';

export interface CmComOpenRouteProps {
  comw?: CmComWid;
  tran?: '-!-';
}

export type CmOpenComLinkRenderer = (props: {
  children: React.ReactNode;
  search: CmComOpenRouteProps;
  linkRef?: React.RefObject<HTMLAnchorElement | null>;
}) => React.ReactNode;
