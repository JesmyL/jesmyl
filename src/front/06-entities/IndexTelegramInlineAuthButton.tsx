import { indexBasicsSokiInvocatorClient } from '#basis/lib/invocators/schedules/fresh-invocator.methods';
import BrutalItem from '#shared/ui/brutal-item/BrutalItem';
import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TelegramWebAppApiOr } from '#shared/ui/tg-app/TelegramWebAppApiOr';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from 'react-router-dom';

export const IndexTelegramInlineAuthButton = () => {
  return (
    <TelegramWebAppApiOr>
      {api => {
        return (
          <Link
            to="login"
            id="authorize-button"
            className="full-width"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="Authorized" />}
              title="Авторизоваться"
              box={
                api?.initDataUnsafe?.user && (
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
