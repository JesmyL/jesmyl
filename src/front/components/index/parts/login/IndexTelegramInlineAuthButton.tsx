import { mylib } from 'front/utils';
import { Link } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import { TelegramWebAppApiOr } from '../../../../complect/tg-app/getTgApi';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconAuthorizedStrokeRounded } from '../../../../complect/the-icon/icons/authorized';
import { IconTelegramStrokeRounded } from '../../../../complect/the-icon/icons/telegram';
import { soki } from '../../../../soki';
import { useSetAuth } from '../../molecules';

export const IndexTelegramInlineAuthButton = () => {
  const setAuth = useSetAuth();

  return (
    <TelegramWebAppApiOr>
      {api => {
        return (
          <Link
            to="login"
            className="full-width"
          >
            <BrutalItem
              icon={<IconAuthorizedStrokeRounded />}
              title="Авторизоваться"
              box={
                api?.initData && (
                  <IconButton
                    Icon={IconTelegramStrokeRounded}
                    className="color--ok"
                    onClick={event => {
                      event.preventDefault();

                      soki
                        .send({ tgNativeAuthorization: api.initDataUnsafe.user }, 'index')
                        .on(({ tgAuthorization }) => {
                          if (!tgAuthorization || !tgAuthorization.ok || mylib.isStr(tgAuthorization.value)) return;

                          setAuth(tgAuthorization.value);
                          soki.sendConnectionHandshake();
                        });
                    }}
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
