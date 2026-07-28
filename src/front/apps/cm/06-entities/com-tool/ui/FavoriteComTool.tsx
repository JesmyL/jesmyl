import { translateBase } from '#basis/locale';
import { useCmComCurrent } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { MenuComToolName } from 'shared/api';
import { CmComTool } from '../ComTool';

export const CmComToolFavorite = () => {
  const ccom = useCmComCurrent();
  const { isFavourite, toggleFavourite } = useCmComFavouriteList();

  if (!ccom) return <CmComTool icon="Star" />;

  return (
    <CmComTool
      title={translateBase(it => it.cm.com.tool[MenuComToolName.MarkCom], { v: +isFavourite(ccom.wid) })}
      icon="Star"
      iconKind={isFavourite(ccom.wid) ? 'SolidRounded' : undefined}
      onClick={() => toggleFavourite(ccom.wid)}
    />
  );
};
