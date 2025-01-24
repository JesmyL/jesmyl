import { atomValueSetter } from 'front/complect/atoms';
import { soki } from 'front/soki';
import { mylib } from 'front/utils';
import { SokiClientEvent, SokiSubscribtionName } from 'shared/api';
import { isAuthorizedAtom, setAuthValue, statisticAtom } from '../atoms';

export const listenSokiEventsForIndex = () => {
  const subscriptions = {} as Record<SokiSubscribtionName, SokiClientEvent>;
  const setIsAuthorized = atomValueSetter(isAuthorizedAtom);

  soki.onEventServerListen('index', event => {
    if (event.unregister) {
      setAuthValue({ level: 0 });
      // setUpdateRequisitesValue(null);
      return;
    }

    if (event.statistic) statisticAtom.set(event.statistic);

    if (event.authorized !== undefined) {
      soki.setIsConnected(true);
      setIsAuthorized(true);
      // soki.makeInitialRequests();
      mylib.values(subscriptions).forEach(event => soki.sendForce(event.body, event.appName));
    }
  });

  soki.onEventClientListen('*', event => {
    if (event.body.subscribe) subscriptions[event.body.subscribe] = event;
    if (event.body.unsubscribe) delete subscriptions[event.body.unsubscribe];
  });
};
