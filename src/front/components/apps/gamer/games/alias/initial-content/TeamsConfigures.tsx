import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import KeyboardInput from '../../../../../../complect/keyboard/KeyboardInput';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import IconCheckbox from '../../../../../../complect/the-icon/IconCheckbox';
import { IconUserStrokeRounded } from '../../../../../../complect/the-icon/icons/user';
import { useGamerRoomPlayers } from '../../../complect/rooms/room/hooks/players';
import { useAliasMemberList } from '../hooks/member-list';
import { useAliasRoomState } from '../hooks/state';

export interface AliasTeamsPropsPart {
  teamsCount: number;
  isComputeNewTeams: boolean;
  teamsTitles: string[];
}

export const initialAliasTeamsPropsPart: AliasTeamsPropsPart = {
  isComputeNewTeams: true,
  teamsCount: 2,
  teamsTitles: [],
};

interface Props {
  isCantStartRound: boolean;
  setIsTeamsRejToStart: (is: boolean) => void;
  stateRef: React.MutableRefObject<AliasTeamsPropsPart>;
}

export const AliasRoomTeamsConfigures = ({ isCantStartRound, setIsTeamsRejToStart, stateRef }: Props) => {
  const state = useAliasRoomState();
  const players = useGamerRoomPlayers();
  const isOddPlayersCount = !(players && players.length % 2 === 0);
  const membersInPrevRound = useAliasMemberList(state);
  const isCantComputeNewTeams =
    membersInPrevRound?.length !== players?.length ||
    (membersInPrevRound && players?.some(member => !membersInPrevRound.includes(member.login)));
  // const nameRandomizer = useGetRandomTwiceName();
  const [isComputeNewTeamsState, setIsComputeNewTeamsState] = useState(initialAliasTeamsPropsPart.isComputeNewTeams);
  const [isHystericsModeState, setIsHystericsModeState] = useState(false);
  const [teamsCountState, setTeamsCountState] = useState(state?.teams.length || initialAliasTeamsPropsPart.teamsCount);

  const [teamsTitles, setTeamTitles] = useState<string[]>(initialAliasTeamsPropsPart.teamsTitles);
  stateRef.current.teamsTitles = teamsTitles;

  const isHystericsMode = !isOddPlayersCount && isHystericsModeState && players!.length !== 2;

  const teamsCount = (stateRef.current.teamsCount = isHystericsMode ? (players?.length || 0) / 2 : teamsCountState);

  const isComputeNewTeams = (stateRef.current.isComputeNewTeams = isCantComputeNewTeams || isComputeNewTeamsState);

  useEffect(() => {
    setIsTeamsRejToStart(teamsCount < 2 || !players || players.length < teamsCount);
  }, [isHystericsMode, players, setIsTeamsRejToStart, teamsCount]);

  // useEffect(() => {
  //   if (teamsCount && (!teamsTitles.length || (teamsTitles.length !== teamsCount && !isCantStartRound))) {
  //     const titles: string[] = [];
  //     while (titles.length < teamsCount) titles.push(nameRandomizer().join(' '));
  //     setTeamTitles(titles);
  //   }
  // }, [teamsTitles, teamsCount, isCantStartRound, nameRandomizer, setTeamTitles]);

  if (players == null) return null;

  return (
    <>
      {state && (
        <IconCheckbox
          checked={isComputeNewTeams}
          onChange={setIsComputeNewTeamsState}
          disabled={isCantComputeNewTeams}
          postfix="Собрать новые команды"
        />
      )}
      {isComputeNewTeams && (
        <>
          <div className="flex flex-gap margin-gap-v">
            <IconButton
              Icon={IconUserStrokeRounded}
              className="nowrap"
              postfix="Количество команд"
            />
            {isHystericsMode ? (
              <span className="color--7">
                {teamsCount} {mylib.declension(teamsCount, 'пара', 'пары', 'пар')}
              </span>
            ) : (
              <KeyboardInput
                value={'' + teamsCountState}
                type="number"
                onChange={val => setTeamsCountState(+val)}
              />
            )}
          </div>
          {teamsTitles.map(teamTitle => (
            <div
              key={teamTitle}
              className="margin-giant-gap-l color--3"
            >
              {teamTitle}
            </div>
          ))}
        </>
      )}
      {isComputeNewTeamsState && (
        <IconCheckbox
          checked={isHystericsModeState}
          onChange={setIsHystericsModeState}
          disabled={isOddPlayersCount || players.length === 2}
          className="margin-gap-t"
          postfix={
            <>
              Режим истерики
              {isOddPlayersCount && <span className="color--ko"> - нечётное количество участников</span>}
            </>
          }
        />
      )}
    </>
  );
};
