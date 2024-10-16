import { FaceItem } from '../../../../../complect/FaceItem';
import { IconCubeStrokeRounded } from '../../../../../complect/the-icon/icons/cube';
import { TeamGameImportable } from '../../Leader.model';
import useGames from './useGames';

export default function TeamGameFace({
  game,
  importantOnClick,
}: {
  game: TeamGameImportable;
  importantOnClick?: () => void;
}) {
  const { goToGame } = useGames();

  return (
    <FaceItem onClick={importantOnClick || (() => goToGame(game.w))}>
      <span className="face-logo">
        <IconCubeStrokeRounded />
      </span>
      <span className="face-title">{game.name}</span>
    </FaceItem>
  );
}
