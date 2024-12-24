import { soki } from 'front/soki';
import { bibleMolecule } from '../bible/molecules';

export const listenSokiEventsForBible = () => {
  soki.onEventServerListen('bible', event => {
    soki.serverEventAppExecs(bibleMolecule, event);
    soki.serverEventAppActions(bibleMolecule, event);
  });
};
