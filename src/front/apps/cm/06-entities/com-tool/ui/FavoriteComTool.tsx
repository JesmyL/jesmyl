import { useCmComCurrent } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { CmComTool } from '../ComTool';

export const CmComToolFavorite = () => {
  const ccom = useCmComCurrent();
  const { isFavourite, toggleFavourite } = useCmComFavouriteList();
  const addTitle = 'Добавить избранное';

  if (!ccom)
    return (
      <CmComTool
        title={addTitle}
        icon="Star"
      />
    );

  return (
    <CmComTool
      title={isFavourite(ccom.wid) ? 'Удалить избранное' : addTitle}
      icon="Star"
      iconKind={isFavourite(ccom.wid) ? 'SolidRounded' : undefined}
      onClick={() => toggleFavourite(ccom.wid)}
    />
  );
};
