import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { RoutingAppConfig } from '../../../../app/routing-apps';
import TheComposition from '../col/com/TheComposition';
import Translations from '../translation/Translation';
import { CmFooter } from './CmFooter';

const CmRouter = React.lazy(() => import('./CmRouter'));

export const cmRoutingApp: RoutingAppConfig = {
  appName: 'cm',
  title: 'Песни возрождённых',
  router: mainNode => (
    <Suspense>
      <CmRouter mainNode={mainNode} />
    </Suspense>
  ),
  footer: <CmFooter />,
  icon: 'BookOpen02',
  lazies: [<CmRouter mainNode />],
  level: 0,
};

export const cmCompositionRoute = (children: (children: React.ReactNode) => React.ReactNode) => {
  return (
    <>
      <Route
        path="@tran"
        element={children(<Translations />)}
      />

      <Route
        path=":comw/*"
        element={children(<TheComposition />)}
      />
    </>
  );
};
