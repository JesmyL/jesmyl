import { soki } from 'front/soki';
import { cmMolecule } from '../molecules';

export const listenSokiEventsForCm = () => {
  soki.onEventServerListen('cm', event => {
    soki.serverEventAppExecs(cmMolecule, event);
    soki.serverEventAppActions(cmMolecule, event);
  });
};
