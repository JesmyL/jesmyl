import { useAppNameContext } from '#basis/lib/contexts';
import { TelegramWebAppApiOr } from '#basis/ui/tg-app/getTgApi';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexBasicsSokiInvocatorClient } from '$index/db/invocators/schedules/fresh-invocator.methods';
import { Link } from '@tanstack/react-router';

export const IndexTelegramInlineAuthButton = () => {
  const appName = useAppNameContext();

  return (
    <TelegramWebAppApiOr>
      {api => {
        return (
          <Link
            to="/!other/$appName/auth"
            params={{ appName }}
            id="authorize-button"
            className="full-width"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="Authorized" />}
              title="Авторизоваться"
              box={
                api?.initDataUnsafe?.user && (
                  // todo edd event.stopPropagation();
                  <TheIconSendButton
                    icon="Telegram"
                    className="color--ok"
                    onSend={async () =>
                      await indexBasicsSokiInvocatorClient.authMeByTelegramMiniButton(null, api.initDataUnsafe.user)
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
