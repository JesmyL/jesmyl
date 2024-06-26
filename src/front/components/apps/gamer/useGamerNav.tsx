import { Dispatch } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { LocalSokiAuth, SokiServerEvent } from '../../../../back/complect/soki/soki.model';
import mylib from '../../../complect/my-lib/MyLib';
import { NavigationConfig } from '../../../complect/nav-configurer/Navigation';
import { INavigationRouteChildItem, UseNavAction } from '../../../complect/nav-configurer/Navigation.model';
import useNavConfigurer from '../../../complect/nav-configurer/useNavConfigurer';
import { QRCodeReaderData } from '../../../complect/qr-code/QRCodeMaster.model';
import { iconPackOfGameController03 } from '../../../complect/the-icon/icons/game-controller-03';
import { iconPackOfPassport } from '../../../complect/the-icon/icons/passport';
import { IconVoiceIdStrokeRounded } from '../../../complect/the-icon/icons/voice-id';
import { TheIconType } from '../../../complect/the-icon/model';
import Gamer from './Gamer';
import { GamerGameName, GamerRoom } from './Gamer.back-model';
import { GamerNavData, GamerPassport, GamerStorage } from './Gamer.model';
import di from './Gamer.store';
import GamerApp from './GamerApp';
import TheGamerPassport from './complect/GamerPassport';
import GamerOfflineRoom from './complect/rooms/offline-room/GamerOfflineRoom';
import SpyCurrentOfflineGameInfo from './complect/rooms/offline-room/SpyCurrentOfflineGameInfo';
import SpyOfflineRoomContent from './complect/rooms/offline-room/SpyOfflineRoomContent';
import TheGamerRoom from './complect/rooms/room/GamerRoom';
import AliasRoomContent from './games/alias/AliasRoomContent';
import { toStopAliasGame } from './games/alias/hooks/execs';
import SpyRoomContent from './games/spy/SpyRoomContent';
import { SPY_ROLE, unsecretSpyRole } from './games/spy/hooks/locations';
import { OfflineGameShare } from './games/spy/offline-room/SpyOfflineRoom.model';
import { IconAnonymousStrokeRounded } from '../../../complect/the-icon/icons/anonymous';

interface GameData {
  Icon: TheIconType;
  title: string;
  onResetGame?: (room: GamerRoom | und) => Promise<SokiServerEvent | null> | nil;
}

export type GamerRoomGameSkelet<DataDifference = {}> = INavigationRouteChildItem<
  GamerNavData,
  GameData & DataDifference,
  GamerGameName
>;

export const gamerRoomGames: GamerRoomGameSkelet[] = [
  {
    phase: ['spy'],
    node: <SpyRoomContent />,
    data: {
      Icon: IconAnonymousStrokeRounded,
      title: 'Шпион 1.0',
    },
  },
  {
    phase: ['alias'],
    node: <AliasRoomContent />,
    data: {
      Icon: IconVoiceIdStrokeRounded,
      title: 'Алиас',
      onResetGame: toStopAliasGame,
    },
  },
];

export const gamerOfflineRoomGames: GamerRoomGameSkelet<{
  currentNode: ReactNode;
  qrDataCatcher: (
    dispatch: Dispatch,
    passport: LocalSokiAuth | GamerPassport,
    data: QRCodeReaderData<any, any>,
  ) => void;
}>[] = [
  {
    phase: ['spy'],
    node: <SpyOfflineRoomContent />,
    data: {
      Icon: IconAnonymousStrokeRounded,
      title: 'Шпион 1.0',
      currentNode: <SpyCurrentOfflineGameInfo />,
      qrDataCatcher: (dispatch, passport, data) => {
        if (!passport.login) return;
        const [location, spiesCount, iterations, memberStrList] = (data.value as OfflineGameShare) || [];
        const members = memberStrList.match(/\.|.{0,32}/g);
        if (!members) return;
        const md5passport = mylib.md5(passport.login);
        const memberi = members.indexOf(md5passport);
        if (memberi < 0) return;
        else {
          const newMembers = [...members];
          newMembers[memberi] = '.';

          dispatch(
            di.offlineSpyGame({
              iterations,
              location: memberi < spiesCount ? SPY_ROLE : unsecretSpyRole(location),
              reshareData: [location, spiesCount, iterations, newMembers.join('')],
            }),
          );
          dispatch(di.currentOfflineGameName('spy'));
        }
      },
    },
  },
];

const gamerNavigation = new NavigationConfig<GamerStorage, GamerNavData>('gamer', {
  title: 'Игрок',
  root: content => <GamerApp content={content} />,
  rootPhase: 'gamer',
  routes: [
    {
      phase: ['gamer'],
      iconSelfPack: iconPackOfGameController03,
      title: 'Игрок',
      node: <Gamer />,
      next: [
        {
          phase: ['room'],
          node: config => <TheGamerRoom config={config} />,
          next: [
            {
              phase: ['needChooseGame'],
              node: null,
            },
            ...gamerRoomGames,
          ],
        },
        {
          phase: ['offlineRoom'],
          node: config => <GamerOfflineRoom config={config} />,
          next: [
            {
              phase: ['needChooseGame'],
              node: null,
            },
            ...gamerOfflineRoomGames,
          ],
        },
      ],
    },
    {
      phase: ['passport'],
      iconSelfPack: iconPackOfPassport,
      title: 'Паспорт',
      node: <TheGamerPassport />,
    },
  ],
});

const actions: UseNavAction[] = [];

export default function useGamerNav() {
  return useNavConfigurer<GamerStorage, GamerNavData>('gamer', actions, gamerNavigation);
}
