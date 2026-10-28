import { soki } from '#shared/soki';
import { takeEditorLanguageAtom } from '#basis/state/locale';
import { cmEditorIDB } from '../state/cmEditorIDB';
import { cmEditorClientTsjrpcMethods } from './cm-editor.tsjrpc.methods';

export const cmEditorInitialInvokes = () => {
  takeEditorLanguageAtom();

  const getFreshes = async () => {
    const lastModfiedAt = await cmEditorIDB.get.lastModifiedAt();
    await cmEditorClientTsjrpcMethods.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmEditorIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
