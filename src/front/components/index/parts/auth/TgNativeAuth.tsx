import { Script } from '#shared/ui/tags/Script';
import { indexBasicsSokiInvocatorClient } from '$index/db/invocators/schedules/fresh-invocator.methods';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { TelegramNativeAuthUserData } from 'shared/api';
import styled from 'styled-components';

const funcName = 'onTelegramNativeAuth';
const win: Record<string, unknown> = window as never;

export const TgNativeAuth = () => {
  const tgNativeRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<unknown>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isScriptLoaded || tgNativeRef.current === null || tgNativeRef.current.childElementCount !== 0) return;
    const tgAuthIframe = document.querySelector('#telegram-login-jesmylbot');

    win[funcName] = async (user: TelegramNativeAuthUserData) => {
      await indexBasicsSokiInvocatorClient.authMeByTelegramNativeButton(null, user);
      navigate({ to: '..' });
    };

    if (tgAuthIframe === null) return;
    tgNativeRef.current.appendChild(tgAuthIframe);

    return () => {
      document.body.appendChild(tgAuthIframe);
      delete win[funcName];
    };
  }, [isScriptLoaded, navigate]);

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
