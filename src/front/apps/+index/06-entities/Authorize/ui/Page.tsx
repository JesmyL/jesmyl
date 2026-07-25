import { useConnectionState } from '#basis/lib/useConnectionState';
import { translateBase } from '#basis/locale';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { soki } from '#shared/soki';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { IndexEmailConfirm } from '$index/entities/EmailConfirm';
import { authIDB } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { IndexAuthorizeTelegramStyledPage } from '../style/IndexTelegramAuth.styled';
import { IndexAuthorizeByTelegram } from './TelegramAuthorize';

export const IndexAuthorizePage = () => {
  const [isTgAuth, setIsTgAuth] = useState(false);

  const connectionNode = useConnectionState();
  const navigate = useNavigate();

  return (
    <IndexAuthorizeTelegramStyledPage
      className=""
      headTitle={translateBase(it => it.toAuth)}
      head={
        <>
          {connectionNode}
          {/* {isTgAuth ? (
            <Button
              icon="Mail01"
              onClick={() => setIsTgAuth(itNIt)}
            >
              По E-mail
            </Button>
          ) : (
            <Button
              icon="Telegram"
              onClick={() => setIsTgAuth(itNIt)}
            >
              По tg
            </Button>
          )} */}
        </>
      }
      content={
        <>
          <div className="flex around column h-full w-full">
            <div className="logo pt-5">
              <div className="logo-container">
                <JesmylLogo />
              </div>
              <div className="text">JesmyL</div>
            </div>

            {isTgAuth ? (
              <IndexAuthorizeByTelegram />
            ) : (
              <IndexEmailConfirm
                onSend={email => indexTsjrpcClientMethods.sendEmailOTP_v1({ email })}
                onConfirm={async otp => {
                  const { auth, token } = await indexTsjrpcClientMethods.authByEmailOTP({ otp });

                  await authIDB.set.auth(auth);
                  await authIDB.set.token(token);

                  soki.onBeforeAuthorizeEvent.invoke();
                  setTimeout(() => soki.onAuthorizeEvent.invoke(), 100);

                  navigate({ to: '..' });
                  toast(
                    translateBase(it => it.authSuccess),
                    makeToastOKMoodConfig(),
                  );
                }}
              />
            )}
          </div>
        </>
      }
    />
  );
};
