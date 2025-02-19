import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/icon';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import { Link } from 'react-router-dom';
import { TelegramWebAppApiOr } from '../../../../complect/tg-app/getTgApi';
import { indexBasicsSokiInvocatorClient } from '../../db/invocators/schedules/fresh-invocator.methods';

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
