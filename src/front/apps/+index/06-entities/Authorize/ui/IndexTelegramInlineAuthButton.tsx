import { useAppNameContext } from '#basis/state/contexts';
import { TelegramWebAppApiOr } from '#basis/ui/tg-app/getTgApi';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Link } from '@tanstack/react-router';

export const IndexAuthorizeTelegramInlineAuthButton = () => {
  const appName = useAppNameContext();

  return (
    <TelegramWebAppApiOr>
      {api => {
        return (
          <Link
            to="/!other/$appName/auth"
            params={{ appName }}
            id="authorize-button"
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="Authorized" />}
              title="Авторизоваться"
              box={
                api?.initDataUnsafe?.user && (
                  // todo edd event.stopPropagation();
                  <TheIconSendButton
                    icon="Telegram"
                    className="text-xOK"
                    onSend={async () =>
                      await indexTsjrpcClientMethods.authMeByTelegramMiniButton({
                        user: api.initDataUnsafe.user,
                      })
                    }
                  />
                )
              }
            />
          </Link>
        );
      }}
    </TelegramWebAppApiOr>
  );
};
