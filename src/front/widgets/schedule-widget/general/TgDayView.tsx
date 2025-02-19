import { appAttsStore } from '#basis/lib/appScheduleAttrsStorage';
import { MyLib } from '#shared/lib/my-lib';
import { TheIconLoading } from '#shared/ui/icon';
import { indexBasicsSokiInvocatorClient } from 'front/components/index/fresh-invocator.methods';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ScheduleWidgetAppAttBasic } from 'shared/api';
import styled from 'styled-components';
import { useInitSoki } from '../../../app/useInitSoki';
import { useAuth } from '../../../components/index/atoms';
import { TelegramWebAppApiOr } from '../../tg-app/getTgApi';
import { TelegramWebApp, TelegramWebAppInitData } from '../../tg-app/model';
import { ScheduleWidgetAlarmContent } from '../alarm/AlarmContent';
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
    <Routes>
      <Route
        index
        element={
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
        }
      />
      {MyLib.values(appAttsStore).map(appStoreBox => {
        const box = appStoreBox as ScheduleWidgetAppAttBasic;
        return <React.Fragment key={box.title}>{box.routes}</React.Fragment>;
      })}
    </Routes>
  );
}

type Props = {
  api: TelegramWebApp | nil;
  isLoading: boolean;
  initData: TelegramWebAppInitData;
};

const Child = ({ api, initData }: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const { schedule, error, isLoading } = useGetScheduleOrPull(initData.chat_instance);

  useEffect(() => {
    if (params.schw != null || schedule?.w == null) return;
    navigate('' + schedule.w);
  }, [navigate, params.schw, schedule?.w]);

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
  padding: 0 10px 30px 10px;
`;
