import { FileRoutesByPath } from '@tanstack/react-router';
import { ReactNode } from 'react';

export interface PageContainerConfigurerProps extends PageContainerProps {
  goBack?: (isForceBack?: boolean) => void;
}

export interface PageContainerProps {
  className: string;
  headClass?: string;
  contentClass?: string;
  withoutBackButton?: boolean;
  headTitle?: ReactNode;
  head?: ReactNode;
  content: ReactNode;
  backButtonIcon?: KnownStameskaIconName;
  backButtonPath?: keyof FileRoutesByPath;
  backButtonRender?: PageContainerBackLinkRender;
  contentRef?: React.Ref<HTMLDivElement>;
  onMoreClick?: (is: true) => void;
  withoutBackSwipe?: boolean;
  hideFooterMenu?: boolean;
}

export type PageContainerBackLinkRender = (
  linkRef: React.RefObject<HTMLAnchorElement | null>,
  children: React.ReactNode,
) => React.ReactNode;
