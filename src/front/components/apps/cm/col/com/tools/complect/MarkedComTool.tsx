import { useFavoriteComs } from '@cm/lists/favorites/useFavoriteComs';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../useMigratableComTools';

export const MarkedComTool = () => {
  const ccom = useComToolsCcomContext();
  const { isMarked, toggleMarked } = useFavoriteComs();

  return (
    ccom && (
      <ComTool
        title={isMarked(ccom.wid) ? 'Удалить избранное' : 'Добавить избранное'}
        icon="Star"
        iconKind={isMarked(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => toggleMarked(ccom.wid)}
      />
    )
  );
};
