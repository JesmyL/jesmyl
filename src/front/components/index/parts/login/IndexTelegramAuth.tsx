import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JesmylLogo from '../../../../complect/jesmyl-logo/JesmylLogo';
import KeyboardInput from '../../../../complect/keyboard/KeyboardInput';
import useToast from '../../../../complect/modal/useToast';
import SendButton from '../../../../complect/sends/send-button/SendButton';
import { useActualRef } from '../../../../complect/useActualRef';
import { useIndexValues } from '../../atoms';
import { indexBasicsSokiInvocatorClient } from '../../db/invocators/schedules/fresh-invocator.methods';
import useConnectionState from '../../useConnectionState';
import { LoginIndex } from './IndexLoginAuth';
import { TgNativeAuth } from './TgNativeAuth';
import { useAuthErrors } from './atoms';

export default function IndexTelegramAuth({ onLoginAuth }: { onLoginAuth: () => void }) {
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendTgCode, setIsSendTgCode] = useState(false);
  const values = useIndexValues();

  const connectionNode = useConnectionState();
  const [errors] = useAuthErrors();
  const navigate = useNavigate();
  const error = (message: string | nil) => message && <div className="login-error-message">{message}</div>;
  const [toastNode, showToast] = useToast({ mood: 'ko' });

  const showToastRef = useActualRef(showToast);

  return (
    <LoginIndex
      className=""
      headTitle="Авторизация"
      head={connectionNode}
      content={
        <>
          {toastNode}
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
                        <TgNativeAuth showToastRef={showToastRef} />
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
                      <KeyboardInput
                        onChange={setAuthCode}
                        value={authCode}
                        placeholder="Одноразовый код"
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
                      navigate('..');
                    }}
                    onFailure={errorMessage => {
                      setIsLoading(false);
                      showToast(errorMessage);
                    }}
                    onSend={async () => {
                      setIsLoading(true);
                      return await indexBasicsSokiInvocatorClient.authMeByTelegramBotNumber(null, +authCode);
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
}
