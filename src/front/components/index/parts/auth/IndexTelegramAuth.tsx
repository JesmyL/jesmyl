import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { useToast } from '#shared/ui/modal/useToast';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { useConnectionState } from '$index/useConnectionState';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuthErrors } from './atoms';
import { IndexTelegramAuthStyledPage } from './IndexTelegramAuth.styled';
import { TgNativeAuth } from './TgNativeAuth';

export const IndexTelegramAuthPage = () => {
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendTgCode, setIsSendTgCode] = useState(false);
  const [values] = useInvocatedValue(
    {},
    ({ aborter }) => indexTsjrpcClientMethods.getIndexValues(undefined, { aborter }),
    [],
  );

  const connectionNode = useConnectionState();
  const [errors] = useAuthErrors();
  const navigate = useNavigate();
  const error = (message: string | nil) => message && <div className="login-error-message">{message}</div>;
  const toast = useToast({ mood: 'ko' });

  return (
    <IndexTelegramAuthStyledPage
      className=""
      headTitle="Авторизация"
      head={connectionNode}
      content={
        <>
          <div className="flex around column full-height full-width">
            <div className="logo padding-big-gap-t">
              <div className="logo-container">
                <JesmylLogo />
              </div>
              <div className="text">JesmyL</div>
            </div>

            <div className="relative flex column full-width">
              <div>
                Для авторизации нужно:
                <ol>
                  <li className="children-middle">
                    Запустить бота
                    <span className="margin-gap">
                      <a
                        href="https://t.me/jesmylbot"
                        className="children-middle"
                      >
                        <LazyIcon
                          icon="Telegram"
                          className="margin-gap-r"
                        />
                        jesmylbot
                      </a>
                    </span>
                  </li>
                  <li>
                    Состоять в канале
                    <span className="margin-gap">
                      <a
                        id="go-to-chanel-link"
                        href={values.chatUrl}
                        className="children-middle"
                      >
                        <LazyIcon
                          icon="Telegram"
                          className="margin-gap-r"
                        />
                        jesmyl space
                      </a>
                    </span>
                    {isSendTgCode && (
                      <ol type="a">
                        <li>Перейти в него</li>
                        <li>Нажать кнопку "Авторизоваться" в закрепе</li>
                        <li>Ввести код из личного сообщения от бота сюда:</li>
                      </ol>
                    )}
                  </li>
                  {!isSendTgCode && (
                    <li>
                      <div className="flex flex-gap">
                        <TgNativeAuth />
                        или
                        <span
                          id="input-the-tg-code-button"
                          className="color--7 pointer"
                          onClick={() => setIsSendTgCode(true)}
                        >
                          ввести код
                        </span>
                      </div>
                    </li>
                  )}
                </ol>
              </div>
              {isSendTgCode && (
                <>
                  <div className="input-container flex">
                    {error(errors.login)}
                    <div
                      id="tg-auth-code-input-wrapper"
                      className="input-wrapper"
                    >
                      <TextInput
                        placeholder="Одноразовый код"
                        className="input"
                        onInput={setAuthCode}
                        value={authCode}
                      />
                    </div>
                  </div>
                  <SendButton
                    id="tg-auth-code-send-button"
                    title="Авторизоваться"
                    className="send-button"
                    disabled={isLoading || authCode.length < 3}
                    onSuccess={async () => {
                      setIsLoading(false);
                      navigate({ to: '..' });
                    }}
                    onFailure={errorMessage => {
                      setIsLoading(false);
                      toast(errorMessage);
                    }}
                    onSend={async () => {
                      setIsLoading(true);
                      return await indexTsjrpcClientMethods.authMeByTelegramBotNumber({
                        secretNumber: +authCode,
                      });
                    }}
                  />
                </>
              )}
            </div>
            {/* <div className="flex pointer color--3">
              <span onClick={onLoginAuth}>Ввести логин/пароль</span>
            </div> */}
          </div>
        </>
      }
    />
  );
};
