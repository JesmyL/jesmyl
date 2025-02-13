import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { Link } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import { TelegramWebAppApiOr } from '../../../../complect/tg-app/getTgApi';
import { IconAuthorizedStrokeRounded } from '../../../../complect/the-icon/icons/authorized';
import { IconTelegramStrokeRounded } from '../../../../complect/the-icon/icons/telegram';
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
              icon={<IconAuthorizedStrokeRounded />}
              title="Авторизоваться"
              box={
                api?.initDataUnsafe?.user && (
                  <EvaSendButton
                    Icon={IconTelegramStrokeRounded}
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
