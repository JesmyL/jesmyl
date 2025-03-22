import { cmEditorSokiInvocatorBaseClient } from '$cm+editor/basis/lib/cm-editor-invocator.base';
import { cmEditorClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { soki } from 'front/soki';

export const cmEditorInitialInvokes = () => {
  cmEditorSokiInvocatorBaseClient.$$register();

  const getFreshes = async (lastModified: number) => {
    await cmEditorClientInvocatorMethods.requestFreshes(null, lastModified);
  };

  soki.listenOnConnectionOpenEvent(async () => {
    const lastModified = await cmEditorIDB.get.lastModifiedAt();
    getFreshes(lastModified);
  });

  soki.onAuthorizeEvent.listen(async () => {
    await cmEditorIDB.updateLastModifiedAt(0);
    await getFreshes(0);
  });
};
