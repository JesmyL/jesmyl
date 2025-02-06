import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TelegramNativeAuthUserData } from 'shared/api';
import styled from 'styled-components';
import { Script } from '../../../../complect/tags/Script';
import { indexBasicsSokiInvocatorClient } from '../../db/invocators/schedules/fresh-invocator.methods';

const funcName = 'onTelegramNativeAuth';

interface Props {
  showToastRef: { current: () => void };
}
const win: Record<string, unknown> = window as never;

export const TgNativeAuth = ({ showToastRef }: Props) => {
  const tgNativeRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<unknown>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isScriptLoaded || tgNativeRef.current === null || tgNativeRef.current.childElementCount !== 0) return;
    const tgAuthIframe = document.querySelector('#telegram-login-jesmylbot');

    win[funcName] = async (user: TelegramNativeAuthUserData) => {
      await indexBasicsSokiInvocatorClient.authMeByTelegramNativeButton(null, user);
      navigate('..');
    };

    if (tgAuthIframe === null) return;
    tgNativeRef.current.appendChild(tgAuthIframe);

    return () => {
      document.body.appendChild(tgAuthIframe);
      delete win[funcName];
    };
  }, [isScriptLoaded, navigate, showToastRef]);

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
