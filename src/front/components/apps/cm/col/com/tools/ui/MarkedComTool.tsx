import { useFavouriteComs } from '@cm/lists/favourites/useFavouriteComs';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../lib/useMigratableComTools';

export const MarkedComTool = () => {
  const ccom = useComToolsCcomContext();
  const { isFavourite, toggleFavourite, favouritesToastNode } = useFavouriteComs();

  return (
    ccom && (
      <>
        <ComTool
          title={isFavourite(ccom.wid) ? 'Удалить избранное' : 'Добавить избранное'}
          icon="Star"
          iconKind={isFavourite(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
          onClick={() => toggleFavourite(ccom.wid)}
        />
        {favouritesToastNode}
      </>
    )
  );
};
