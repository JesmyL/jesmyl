import { useEffect, useRef, useState } from 'react';
import { SokiServerEvent, TelegramNativeAuthUserData } from 'shared/api';
import styled from 'styled-components';
import { Script } from '../../../../complect/tags/Script';
import { soki } from '../../../../soki';

const funcName = 'onTelegramNativeAuth';

interface Props {
  onAuthSuccessRef: { current: (event: SokiServerEvent) => void };
  showToastRef: { current: () => void };
}

export const TgNativeAuth = ({ onAuthSuccessRef, showToastRef }: Props) => {
  const tgNativeRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<unknown>(false);

  useEffect(() => {
    if (!isScriptLoaded || tgNativeRef.current === null || tgNativeRef.current.childElementCount !== 0) return;
    const tgAuthIframe = document.querySelector('#telegram-login-jesmylbot');

    (window as any)[funcName] = (user: TelegramNativeAuthUserData) => {
      soki.send({ tgNativeAuthorization: user }, 'index').on(onAuthSuccessRef.current, showToastRef.current);
    };

    if (tgAuthIframe === null) return;
    tgNativeRef.current.appendChild(tgAuthIframe);

    return () => {
      document.body.appendChild(tgAuthIframe);
      delete (window as any)[funcName];
    };
  }, [isScriptLoaded, onAuthSuccessRef, showToastRef]);

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
