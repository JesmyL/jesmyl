import { ContextMenu } from '#shared/components/ui/context-menu';
import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useCmComSelectedList } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { CmComWid } from 'shared/api';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export const CmComFaceContextMenu = ({ onClick, comWid }: Props) => {
  const { isFavourite, toggleFavourite } = useCmComFavouriteList();
  const isComMarked = isFavourite(comWid);
  const {
    clearSelectedComws,
    selectedComws,
    selectedComPosition: isSelected,
    toggleSelectedCom,
  } = useCmComSelectedList();
  const confirm = useConfirm();

  return (
    <>
      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          toggleFavourite(comWid);
        }}
      >
        <LazyIcon
          icon="Star"
          kind={isComMarked ? 'SolidRounded' : undefined}
        />
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
};
