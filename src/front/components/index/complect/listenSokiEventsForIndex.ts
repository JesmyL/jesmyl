import { atomValueSetter } from 'front/complect/atoms';
import { soki } from 'front/soki';
import { mylib } from 'front/utils';
import { SokiClientEvent, SokiSubscribtionName } from 'shared/api';
import { indexMolecule, isAuthorizedAtom, setAuthValue, setUpdateRequisitesValue } from '../molecules';

export const listenSokiEventsForIndex = () => {
  const subscriptions = {} as Record<SokiSubscribtionName, SokiClientEvent>;
  const setIsAuthorized = atomValueSetter(isAuthorizedAtom);

  soki.onEventServerListen('index', event => {
    if (event.unregister) {
      setAuthValue({ level: 0 });
      setUpdateRequisitesValue(null);
      return;
    }

    if (event.liveData !== undefined) indexMolecule.set('liveData', event.liveData);
    if (event.statistic) indexMolecule.set('statistic', event.statistic);

    if (event.authorized !== undefined) {
      soki.setIsConnected(true);
      setIsAuthorized(true);
      soki.makeInitialRequests();
      mylib.values(subscriptions).forEach(event => soki.sendForce(event.body, event.appName));
    }

    soki.serverEventAppExecs(indexMolecule, event);
    soki.serverEventAppActions(indexMolecule, event);
  });

  soki.onEventClientListen('*', event => {
    if (event.body.subscribe) subscriptions[event.body.subscribe] = event;
    if (event.body.unsubscribe) delete subscriptions[event.body.unsubscribe];
  });
};
