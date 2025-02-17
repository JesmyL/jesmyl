import { AppsRoutingAppConfigDict } from '#shared/model/App.model';
import { bibleRoutingApp } from '../../components/apps/bible/routing/bibleRoutingApp';
import { cmRoutingApp } from '../../components/apps/cm/routing/cmRoutingApp';
import { tunerRoutingApp } from '../../components/apps/tuner/tunerRoutingApp';

export const routingApps: AppsRoutingAppConfigDict = {
  cm: cmRoutingApp,
  bible: bibleRoutingApp,
  tuner: tunerRoutingApp,
};
