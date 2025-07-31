import { cmShareEditorTsjrpcBaseClient } from '$cm+editor/basis/lib/cm-editor.tsjrpc.base';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { soki } from 'front/soki';

export const cmEditorInitialInvokes = () => {
  cmShareEditorTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await cmEditorIDB.get.lastModifiedAt();
    await cmEditorClientTsjrpcMethods.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmEditorIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
