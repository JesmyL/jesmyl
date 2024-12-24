import { mylib } from 'front/utils';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useInitSoki } from '../../../app/useInitSoki';
import { removePullRequisites, useAuthState } from '../../../components/index/molecules';
import { soki } from '../../../soki';
import { TelegramWebAppApiOr } from '../../tg-app/getTgApi';
import { TelegramWebApp, TelegramWebAppInitData } from '../../tg-app/model';
import { TheIconLoading } from '../../the-icon/IconLoading';
import ScheduleWidgetAlarmContent from '../alarm/AlarmContent';
import { useGetScheduleOrPull } from './useSetScheduleOrPull';

const hashParamName = 'tgWebAppData';
const url = new URL(window.location.href);
let initData: TelegramWebAppInitData | null = null;

if (url.hash.startsWith(`#${hashParamName}`)) {
  const data: Record<string, string> = {};

  url.search = url.hash.slice(1);
  url.search = url.searchParams.get(hashParamName) || '';

  Array.from(url.searchParams.entries()).forEach(([key, value]) => (data[key] = value));

  initData = { ...data, user: JSON.parse(data.user) } as TelegramWebAppInitData;
}

export default function ScheduleWidgetTgDayView() {
  useInitSoki('cm');

  return (
    <TelegramWebAppApiOr>
      {(api, isLoading) =>
        initData === null ? (
          <div className="flex center color--ko">Ошибка данных</div>
        ) : (
          <Child
            api={api}
            isLoading={isLoading}
            initData={initData}
          />
        )
      }
    </TelegramWebAppApiOr>
  );
}

type Props = {
  api: TelegramWebApp | nil;
  isLoading: boolean;
  initData: TelegramWebAppInitData;
};

const Child = ({ api, isLoading, initData }: Props) => {
  const [auth, setAuth] = useAuthState();
  const { schedule, error } = useGetScheduleOrPull(initData.chat_instance);

  useEffect(() => api?.disableVerticalSwipes(), [api]);

  useEffect(() => {
    return hookEffectLine()
      .setTimeout(() => {
        if (auth.level) return;

        soki.send({ tgNativeAuthorization: initData.user }, 'index').on(({ tgAuthorization }) => {
          if (!tgAuthorization || !tgAuthorization.ok || mylib.isStr(tgAuthorization.value)) return;

          setAuth(tgAuthorization.value);
          removePullRequisites();
          soki.sendConnectionHandshake();
        });
      }, 300)
      .effect();
  }, [auth.level, initData.user, setAuth]);

  return (
    <StyledBox>
      {schedule ? (
        <ScheduleWidgetAlarmContent
          schedule={schedule}
          isJustShowAllDay
        />
      ) : (
        <div className="full-size flex center">
          {isLoading ? <TheIconLoading /> : <span className="color--ko">{error || 'Мероприятие не найдено'}</span>}
        </div>
      )}
    </StyledBox>
  );
};

const StyledBox = styled.div`
  overflow: auto;
  height: 100vh;
  width: 100vw;
  padding-left: 10px;
  padding-bottom: 30px;
`;
