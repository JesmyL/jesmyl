import { logFrontErrors } from '#basis/lib/error-catcher';
import { localeLastModifiedAtAtom, takeBaseLanguageAtom } from '#basis/state/locale';
import { requestRemoteLocalesIfStale } from '#features/broadcast/remote/remote-locale';
import { renderApplication } from '#shared/lib/renders';
import { soki } from '#shared/soki';
import { appInitEvent, localeForceUpdateAtom } from '$app/store/triggers';
import { authIDB } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc/tsjrpc.methods';
import { indexTsjrpcBaseClient } from '$index/shared/tsjrpc/tsjrpc.shares';
import { PultApp } from '$remote/PultApp';
import { configureAtomaric } from 'atomaric';
import React, { useSyncExternalStore } from 'react';
import { setSharedPolyfills } from 'shared/utils';
import '#basis/locale';
import '$app/App.scss';
import '$app/tw.css';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });
setSharedPolyfills();
logFrontErrors();

indexTsjrpcBaseClient.$$register();
appInitEvent.invoke();

takeBaseLanguageAtom().subscribe(() => localeForceUpdateAtom.do.increment());

const requestLocales = () => {
  void indexTsjrpcClientMethods.requestFreshLocales({ lastModifiedAt: localeLastModifiedAtAtom.get() });
  void requestRemoteLocalesIfStale();
};

requestLocales();
soki.listenOnConnectionOpenEvent(requestLocales);
soki.onAuthorizeEvent.listen(requestLocales);
soki.onTokenInvalidEvent.listen(() => {
  authIDB.remove.auth();
  authIDB.remove.token();
});

renderApplication(
  <React.StrictMode>
    <PultApp />
  </React.StrictMode>,
  document.getElementById('root'),
);
