import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TheButton from '../../../../complect/Button';
import JesmylLogo from '../../../../complect/jesmyl-logo/JesmylLogo';
import KeyboardInput from '../../../../complect/keyboard/KeyboardInput';
import LoadIndicatedContent from '../../../../complect/load-indicated-content/LoadIndicatedContent';
import mylib from '../../../../complect/my-lib/MyLib';
import { LocalSokiAuth } from '../../../../models';
import { soki } from '../../../../soki';
import PhaseIndexContainer from '../../complect/PhaseIndexContainer';
import useIndexNav from '../../complect/useIndexNav';
import { AuthMode, ClientAuthorizationData, ClientRegisterData, ServerAuthorizeInSystem } from '../../Index.model';
import { removePullRequisites, useSetAuth } from '../../molecules';
import useConnectionState from '../../useConnectionState';
import { useAuthErrors } from './atoms';

export default function IndexLoginAuth() {
  const setAuth = useSetAuth();
  // const [, setCurrentApp] = useCurrentApp();
  const [nick, setNick] = useState('');
  const [passw, setPassword] = useState('');
  const [rpassw, setRPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [isInProcess, setIsInProscess] = useState(1);

  const connectionNode = useConnectionState();
  const [errors, setErrors] = useAuthErrors();
  const { navigate } = useIndexNav();
  const error = (message: string | nil) => message && <div className="login-error-message">{message}</div>;

  const sendData = <AuthType extends keyof ServerAuthorizeInSystem>(
    type: AuthType,
    data: ServerAuthorizeInSystem[typeof type],
  ) => {
    return soki.send(
      {
        authorization: {
          type,
          value: data as never,
        },
      },
      'index',
    );
  };

  const loginInSystem = (state: ClientAuthorizationData) => {
    return sendData('login', {
      login: mylib.md5(state.nick.trim()),
      passw: mylib.md5(state.passw),
    });
  };

  const setAuthData = async (auth: LocalSokiAuth) => {
    setAuth(auth);
    // setCurrentApp('cm');
    removePullRequisites();
    soki.onConnect();
  };

  const registerInSystem = (state: Omit<ClientRegisterData, 'login'>) => {
    const nick = state.nick.trim();

    return sendData('register', {
      login: mylib.md5(nick),
      passw: mylib.md5(state.passw),
      fio: nick,
      nick,
      rpassw: mylib.md5(state.rpassw),
    });
  };

  useEffect(() => {
    setErrors({
      login: /[^\w._]/.test(nick)
        ? 'Недопустимые символы'
        : nick.length < 3
          ? 'Минимум 3 символа'
          : nick.length > 20
            ? 'Максимум 20 символов'
            : null,
    });
  }, [nick, setErrors]);

  useEffect(() => {
    setErrors({
      rpassw: mode === 'register' && rpassw !== passw ? 'Пароли не совпадают' : null,
    });
  }, [passw, rpassw, mode, setErrors]);

  return (
    <LoginIndex
      className=""
      headTitle={mode === 'register' ? 'Создать профиль' : 'Вход'}
      head={connectionNode}
      content={
        <LoadIndicatedContent
          className="flex around column full-height full-width"
          isLoading={!isInProcess}
          onLoaded={() => isInProcess !== 2 && navigate(['other'])}
        >
          {mode === 'register' ? null : (
            <div className="logo">
              <div className="logo-container">
                <JesmylLogo />
              </div>
              <div className="text">JesmyL</div>
            </div>
          )}
          <div className="relative flex column full-width">
            <div className="input-container flex">
              {error(errors.login)}
              <div className="input-wrapper">
                <KeyboardInput
                  preferLanguage="en"
                  onChange={value => setNick(value)}
                  value={nick}
                  placeholder="Логин"
                />
              </div>
            </div>
            <div className="input-container flex">
              {error(errors.passw)}
              <div className="input-wrapper">
                <KeyboardInput
                  preferLanguage="en"
                  type="password"
                  onChange={value => setPassword(value)}
                  value={passw}
                  placeholder="Пароль"
                />
              </div>
            </div>
            {mode === 'register' ? (
              <>
                <div className="input-container flex">
                  {error(errors.rpassw)}
                  <div className="input-wrapper">
                    <KeyboardInput
                      preferLanguage="en"
                      type="password"
                      onChange={value => setRPassword(value)}
                      value={rpassw}
                      placeholder="Подтверди пароль"
                    />
                  </div>
                </div>
              </>
            ) : null}
            <button
              className="send-button"
              disabled={Object.keys(errors).length > 0}
              onClick={async () => {
                if (mode === 'check') return;
                setIsInProscess(0);
                (mode === 'login'
                  ? loginInSystem({ nick, passw })
                  : registerInSystem({ nick, passw, rpassw, fio: nick })
                ).on(
                  ({ authorization }) => {
                    if (authorization && authorization.ok !== false) {
                      setIsInProscess(1);
                      removePullRequisites();
                      setAuthData(authorization.value);
                    } else {
                      setErrors({
                        login: authorization?.value || 'Неизвестная ошибка',
                      });
                      setIsInProscess(2);
                    }
                  },
                  errorMessage => {
                    setErrors({
                      login: errorMessage,
                    });
                    setIsInProscess(2);
                  },
                );
              }}
            >
              {mode === 'register' ? 'Создать профиль' : 'Войти'}
            </button>
          </div>
          {mode === 'register' ? null : <TheButton onClick={() => setMode('register')}>Создать профиль</TheButton>}
        </LoadIndicatedContent>
      }
    />
  );
}

export const LoginIndex = styled(PhaseIndexContainer)`
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
        cursor: pointer;
      }
    }
  }

  .send-button {
    cursor: pointer;
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
