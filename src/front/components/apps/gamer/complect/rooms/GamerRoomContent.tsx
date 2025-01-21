import { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { useBottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/useBottomPopup';
import { useConfirm } from '../../../../../complect/modal/confirm/useConfirm';
import { NavigationThrowNodeProps } from '../../../../../complect/nav-configurer/Navigation.model';
import IconButton from '../../../../../complect/the-icon/IconButton';
import { IconCancel01StrokeRounded } from '../../../../../complect/the-icon/icons/cancel-01';
import { IconDelete01StrokeRounded } from '../../../../../complect/the-icon/icons/delete-01';
import { IconLinkBackwardStrokeRounded } from '../../../../../complect/the-icon/icons/link-backward';
import { useAuth } from '../../../../index/atoms';
import { GamerGameName, GamerNavData, GamerRoom } from '../../Gamer.model';
import useGamerNav, { GamerRoomGameSkelet } from '../../useGamerNav';
import GamerRoomMemberList from '../GamerRoomMemberList';
import PhaseGamerContainer from '../PhaseGamerContainer';

export default function GamerRoomContent({
  config,
  isInactive,
  isManager,
  isOwner,
  room,
  onRoomRemove,
  games,
  onGameChange,
}: {
  config: NavigationThrowNodeProps<GamerNavData>;
  isOwner?: boolean;
  isManager?: boolean;
  isInactive?: boolean;
  room?: GamerRoom | null;
  games: GamerRoomGameSkelet[];
  onRoomRemove: (roomw: number) => void;
  onGameChange: (gameName: GamerGameName) => void;
}) {
  const gameData = games.find(({ phase: [gameName] }) => room?.currentGame === gameName)?.data;
  const [confirmNode, confirm] = useConfirm();
  const auth = useAuth();

  const [popupNode, openPopup] = useBottomPopup(
    (isOpen, _, prepare) =>
      isOpen &&
      prepare({
        items: [
          config.relativePoint && {
            title: 'Сменить игру',
            Icon: IconLinkBackwardStrokeRounded,
            onClick: () => {
              goTo('needChooseGame', config.relativePoint);
              setIsForceChoose(true);
            },
          },
          isManager &&
            gameData?.onResetGame &&
            room && {
              title: 'Завершить игру',
              Icon: IconCancel01StrokeRounded,
              onClick: async () => {
                if (await confirm('Завершить игру?')) return gameData?.onResetGame?.(room);
              },
            },
          (auth?.level === 100 || isOwner) && {
            title: 'Удалить комнату',
            Icon: IconDelete01StrokeRounded,
            className: 'color--ko',
            onClick: async () => {
              if (room && (await confirm(`Удалить комнату ${room.name}?`))) {
                onRoomRemove(room.w);
                goBack();
              }
            },
          },
        ],
      }),
  );
  const { goTo, goBack } = useGamerNav();
  const [isForceChoose, setIsForceChoose] = useState(false);

  const isNeedChooseGame = config.currentChildPhase === 'needChooseGame';

  useLayoutEffect(() => {
    if (!isForceChoose && room?.currentGame && (isNeedChooseGame || room?.currentGame !== config.currentChildPhase)) {
      goTo(room.currentGame, config.relativePoint);
    }
  }, [isForceChoose, isNeedChooseGame, room?.currentGame, config.relativePoint, config.currentChildPhase, goTo]);

  return (
    <GamerRoomDiv
      className=""
      headTitle={room?.name ? `${room.name}` : 'Комната'}
      head={
        gameData && (
          <IconButton
            Icon={gameData.Icon}
            className="color--7 margin-gap-r"
            postfix={gameData.title}
          />
        )
      }
      contentClass="flex column custom-align-items padding-gap"
      onMoreClick={isManager ? openPopup : undefined}
      content={
        <>
          {popupNode}
          {confirmNode}
          {!room ? (
            <div className="error-message text-center padding-giant-gap">Комната не найдена</div>
          ) : (
            <>
              {isInactive && !isOwner ? (
                <div>Тебя исключили из комнаты</div>
              ) : (
                <>
                  {isNeedChooseGame ? (
                    <>
                      <GamerRoomMemberList />
                      {isManager ? (
                        <>
                          <h2>Игры</h2>
                          <div className="gamer-game-palette flex center full-width flex-wrap flex-gap">
                            {games.map(({ phase: [gameName], data }) => {
                              if (!data) return null;
                              return (
                                <div
                                  key={gameName}
                                  className="gamer-game-item flex column around flex-gap pointer"
                                  onClick={() => {
                                    goTo(gameName, config.relativePoint);
                                    onGameChange(gameName);
                                    setIsForceChoose(false);
                                  }}
                                >
                                  <data.Icon />
                                  <div className="title">{data.title}</div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                  {config.outletContent}
                </>
              )}
            </>
          )}
        </>
      }
    />
  );
}

const GamerRoomDiv = styled(PhaseGamerContainer)`
  .gamer-game-palette {
    display: flex;

    .gamer-game-item {
      --size: 45vmin;
      --max-size: 300px;

      border-radius: 20px;

      background: var(--color--1);
      width: var(--size);
      max-width: var(--max-size);
      height: var(--size);
      max-height: var(--max-size);

      .the-icon {
        --icon-scale: 3;

        margin-top: 30px;
      }
    }
  }
`;
