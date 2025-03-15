import { TelegramWebAppApiOr } from '#basis/ui/tg-app/getTgApi';
import { TelegramWebApp, TelegramWebAppInitData } from '#basis/ui/tg-app/model';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useAuth } from '$index/atoms';
import { indexBasicsSokiInvocatorClient } from '$index/db/invocators/schedules/fresh-invocator.methods';
import { useEffect } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import styled from 'styled-components';
import { ScheduleWidgetAlarmContent } from '../alarm/AlarmContent';
import { ScheduleCurrentSchwContext } from '../complect/lib/contexts';
import { extractTgRouteDataFromUrl } from './extractTgRouteDataFromUrl';
import { useGetScheduleOrPull } from './useSetScheduleOrPull';

const initData = extractTgRouteDataFromUrl();

export const ScheduleWidgetTgDayView = () => {
  return (
    <TelegramWebAppApiOr>
      {(api, isLoading) =>
        initData === null ? (
          <div className="flex center color--ko full-size">Ошибка данных</div>
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
};

type Props = {
  api: TelegramWebApp | nil;
  isLoading: boolean;
  initData: TelegramWebAppInitData;
};

const Child = ({ api, initData }: Props) => {
  const auth = useAuth();
  const { schedule, error, isLoading } = useGetScheduleOrPull(initData.chat_instance);

  useEffect(() => api?.disableVerticalSwipes(), [api]);

  useEffect(() => {
    return hookEffectLine()
      .setTimeout(() => {
        if (auth.level) return;
        indexBasicsSokiInvocatorClient.authMeByTelegramInScheduleDay(null, initData.user);
      }, 300)
      .effect();
  }, [auth.level, initData.user]);

  return (
    <ScheduleCurrentSchwContext.Provider value={schedule?.w ?? IScheduleWidgetWid.def}>
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
    </ScheduleCurrentSchwContext.Provider>
  );
};

const StyledBox = styled.div`
  overflow: auto;
  height: 100vh;
  width: 100vw;
  padding: 0 10px 30px 10px;
`;
