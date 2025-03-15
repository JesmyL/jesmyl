import { useCcom } from '$cm/basis/lib/com-selections';
import { useFavouriteComs } from '$cm/lists/favourites/useFavouriteComs';
import { ComTool } from '../ComTool';

export const FavoriteComTool = () => {
  const ccom = useCcom();
  const { isFavourite, toggleFavourite } = useFavouriteComs();

  return (
    ccom && (
      <ComTool
        title={isFavourite(ccom.wid) ? 'Удалить избранное' : 'Добавить избранное'}
        icon="Star"
        iconKind={isFavourite(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => toggleFavourite(ccom.wid)}
      />
    )
  );
};
