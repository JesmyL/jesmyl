import { useCmComCurrent } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { CmComTool } from '../ComTool';

export const CmComToolFavorite = () => {
  const ccom = useCmComCurrent();
  const { isFavourite, toggleFavourite } = useCmComFavouriteList();

  return (
    ccom && (
      <CmComTool
        title={isFavourite(ccom.wid) ? 'Удалить избранное' : 'Добавить избранное'}
        icon="Star"
        iconKind={isFavourite(ccom.wid) ? 'SolidRounded' : 'StrokeRounded'}
        onClick={() => toggleFavourite(ccom.wid)}
      />
    )
  );
};
