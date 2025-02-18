import { RoutingAppConfig } from '#basis/model/App.model';
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import TheComposition from '../../../../components/apps/cm/col/com/TheComposition';
import Translations from '../../../../components/apps/cm/translation/Translation';
import { CmFooter } from '../ui/CmFooter';

const CmRouter = React.lazy(() => import('../ui/CmRouter'));

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
