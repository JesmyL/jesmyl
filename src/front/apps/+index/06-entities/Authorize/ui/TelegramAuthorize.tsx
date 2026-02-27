import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc/tsjrpc.methods';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { IndexAuthorizeTgNativeAuth } from './TgNativeAuth';

export const IndexAuthorizeByTelegram = () => {
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendTgCode, setIsSendTgCode] = useState(false);

  const { data: values = {} } = useQuery({
    queryKey: ['getIndexValues'],
    queryFn: () => indexTsjrpcClientMethods.getIndexValues(),
  });

  const navigate = useNavigate();

  return (
    <div className="relative flex column w-full">
      <div>
        Для авторизации нужно:
        <ol>
          <li className="children-middle">
            Запустить бота
            <span className="m-2">
              <a
                href="https://t.me/jesmylbot"
                className="children-middle"
              >
                <LazyIcon
                  icon="Telegram"
                  className="mr-2"
                />
                jesmylbot
              </a>
            </span>
          </li>
          <li>
            Состоять в канале
            <span className="m-2">
              <a
                id="go-to-chanel-link"
                href={values.chatUrl}
                className="children-middle"
              >
                <LazyIcon
                  icon="Telegram"
                  className="mr-2"
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
              <div className="flex gap-2">
                <IndexAuthorizeTgNativeAuth />
                или
                <span
                  id="input-the-tg-code-button"
                  className="text-x7 pointer"
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
              toast(errorMessage, makeToastKOMoodConfig());
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
  );
};
