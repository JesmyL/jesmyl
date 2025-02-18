import { RoutingAppConfig } from '#basis/model/App.model';
import React, { Suspense } from 'react';
import { BibleFooter } from '../ui/BibleFooter';

const BibleRouter = React.lazy(() => import('../ui/BibleRouter'));

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
