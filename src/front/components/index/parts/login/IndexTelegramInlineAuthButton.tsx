import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { Link } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
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
