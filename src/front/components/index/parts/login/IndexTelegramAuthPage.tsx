import { indexBasicsSokiInvocatorClient } from '#basis/lib/invocators/schedules/fresh-invocator.methods';
import JesmylLogo from '#shared/ui/jesmyl-logo/JesmylLogo';
import { useToast } from '#shared/ui/modal';
import PhaseContainerConfigurer from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { useActualRef } from 'front/08-shared/lib/hooks/useActualRef';
import KeyboardInput from 'front/08-shared/ui/keyboard/KeyboardInput';
import SendButton from 'front/08-shared/ui/sends/send-button/SendButton';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useConnectionState from '../../../../07-basis/lib/hooks/+app/useConnectionState';
import { useIndexValues } from '../../atoms';
import { TgNativeAuth } from './TgNativeAuth';
import { useAuthErrors } from './atoms';

export default function IndexTelegramAuthPage() {
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
    <StyledPage
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

export const StyledPage = styled(PhaseContainerConfigurer)`
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .logo-container {
      border-radius: 100%;
      background-color: var(--color--3);
      padding: 15px;

      > .jesmyl-smile {
        --jesmyl-smile-color: var(--color--2);
      }
    }

    > .text {
      margin-top: 0.3em;
      font-size: 2em;
    }
  }

  .input-container {
    --padding-h: 0.8em;

    position: relative;
    margin: 5px 0;
    width: 100%;
    max-width: 500px;

    .icon-button-container {
      margin-right: 10px;
    }

    > .input-wrapper {
      display: flex;
      position: relative;
      align-items: center;
      width: 100%;

      > .input {
        --input-keyboard-background: var(--color--2);
        --autofill-background-color: var(--color--2);
        --autofill-color: var(--text-color);

        border: var(--color--2) 2px solid;
        border-radius: 0.7em;

        background-color: var(--color--2);
        padding: 0.5em var(--padding-h);
        padding-right: 1.5em;
        width: 100%;
        height: 60px;
        color: var(--text-color);
        font-size: 1.5em;

        &::placeholder {
          color: var(--text-color);
        }
      }

      > .the-icon {
        position: absolute;
        right: var(--padding-h);
      }
    }
  }

  .send-button {
    margin: 1.5em 0;
    border-radius: 0.8em;
    background-color: var(--color--3);
    padding: 0.5em 2em;
    color: var(--color--2);
    font-size: 1.5em;
  }

  .login-error-message {
    position: absolute;
    bottom: -7px;
    width: 100%;
    color: var(--color--ko);
    text-align: center;

    + .input-wrapper {
      margin-bottom: 1em;

      > input {
        border-color: var(--color--ko);
      }
      > .the-icon {
        --icon-color: var(--color--ko);
      }
    }
  }
`;
