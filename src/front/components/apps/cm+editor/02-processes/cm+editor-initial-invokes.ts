import { cmEditorSokiInvocatorBaseClient } from '$cm+editor/basis/lib/cm-editor-invocator.base';
import { cmEditorClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { soki } from 'front/soki';

export const cmEditorInitialInvokes = () => {
  cmEditorSokiInvocatorBaseClient.$$register();

  const getFreshes = async () => {
    const lastModified = await cmEditorIDB.get.lastModifiedAt();
    await cmEditorClientInvocatorMethods.requestFreshes(null, lastModified);
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmEditorIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
