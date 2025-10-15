import { soki } from '#shared/soki';
import { cmEditorIDB } from '../state/cmEditorIDB';
import { cmEditorClientTsjrpcMethods } from './cm-editor.tsjrpc.methods';

export const cmEditorInitialInvokes = () => {
  const getFreshes = async () => {
    const lastModfiedAt = await cmEditorIDB.get.lastModifiedAt();
    await cmEditorClientTsjrpcMethods.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmEditorIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
