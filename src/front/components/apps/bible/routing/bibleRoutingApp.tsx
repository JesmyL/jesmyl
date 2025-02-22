import { RoutingAppConfig } from '@app/routing-apps';
import React, { Suspense } from 'react';
import { BibleFooter } from './BibleFooter';

const BibleRouter = React.lazy(() => import('./BibleRouter'));

export const bibleRoutingApp: RoutingAppConfig = {
  appName: 'bible',
  title: 'Библия',
  router: mainNode => (
    <Suspense>
      <BibleRouter mainNode={mainNode} />
    </Suspense>
  ),
  footer: <BibleFooter />,
  icon: 'Book02',
  level: 0,
  lazies: [<BibleRouter mainNode />],
};
