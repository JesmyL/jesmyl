import { useEffect, useRef, useState } from 'react';
import { TelegramNativeAuthUserData } from 'shared/api';
import styled from 'styled-components';
import { Script } from '../../../../complect/tags/Script';
import { indexIDB } from '../../db/index-idb';
import { indexBasicsSokiInvocatorClient } from '../../db/invocators/schedules/fresh-invocator.methods';

const funcName = 'onTelegramNativeAuth';

interface Props {
  showToastRef: { current: () => void };
}

export const TgNativeAuth = ({ showToastRef }: Props) => {
  const tgNativeRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<unknown>(false);

  useEffect(() => {
    if (!isScriptLoaded || tgNativeRef.current === null || tgNativeRef.current.childElementCount !== 0) return;
    const tgAuthIframe = document.querySelector('#telegram-login-jesmylbot');

    (window as any)[funcName] = async (user: TelegramNativeAuthUserData) => {
      const { token, auth } = await indexBasicsSokiInvocatorClient.authMeByTelegramNativeButton(null, user);
      indexIDB.set.auth(auth);
      localStorage.token = token || '';
    };

    if (tgAuthIframe === null) return;
    tgNativeRef.current.appendChild(tgAuthIframe);

    return () => {
      document.body.appendChild(tgAuthIframe);
      delete (window as any)[funcName];
    };
  }, [isScriptLoaded, showToastRef]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="jesmylbot"
        data-size="small"
        data-onauth="onTelegramNativeAuth(user)"
        data-request-access="write"
        onLoad={setIsScriptLoaded}
      />

      <IWrapper
        ref={tgNativeRef}
        className="flex"
      />
    </>
  );
};

const IWrapper = styled.div`
  height: 2.2em;
`;
