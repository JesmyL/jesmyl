import { ContextMenu } from '#shared/components/ui/context-menu';
import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { useFavouriteComs } from '$cm/lists/favourites/useFavouriteComs';
import { CmComWid } from 'shared/api';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export function ComFaceContextMenu({ onClick, comWid }: Props) {
  const { isFavourite, toggleFavourite } = useFavouriteComs();
  const isComMarked = isFavourite(comWid);
  const { clearSelectedComws, selectedComws, selectedComPosition: isSelected, toggleSelectedCom } = useSelectedComs();
  const confirm = useConfirm();

  return (
    <>
      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          toggleFavourite(comWid);
        }}
      >
        <LazyIcon icon={isComMarked ? 'Star' : 'StarCircle'} />
        {isComMarked ? 'Удалить из Избранного' : 'Добавить в Избранное'}
      </ContextMenu.Item>

      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          toggleSelectedCom(comWid);
        }}
      >
        <LazyIcon icon={isSelected(comWid) ? 'RemoveCircleHalfDot' : 'AddCircleHalfDot'} />
        {isSelected(comWid) ? 'Отменить выбор' : 'Выбрать'}
      </ContextMenu.Item>

      {!selectedComws.length || (
        <ContextMenu.Item
          onClick={async () => {
            if (!(await confirm('Очистить список выбранных?'))) return;
            onClick(null);
            clearSelectedComws();
          }}
        >
          <LazyIcon icon="CancelCircleHalfDot" />
          Очистить выбранные
        </ContextMenu.Item>
      )}
    </>
  );
}
