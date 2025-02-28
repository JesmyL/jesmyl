import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { useSelectedComs } from '@cm/base/useSelectedComs';
import { useFavoriteComs } from '@cm/lists/favourites/useFavouriteComs';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export function ComFaceContextMenu({ onClick, comWid }: Props) {
  const { isFavourite, toggleFavourite } = useFavoriteComs();
  const isComMarked = isFavourite(comWid);
  const { clearSelectedComws, selectedComws, selectedComPosition: isSelected, toggleSelectedCom } = useSelectedComs();
  const [confirmNode, confirm] = useConfirm();

  return (
    <StyledMenu>
      {confirmNode}
      <IconButton
        icon={isComMarked ? 'Star' : 'StarCircle'}
        postfix={isComMarked ? 'Удалить из Избранного' : 'Добавить в Избранное'}
        onClick={() => {
          onClick(null);
          toggleFavourite(comWid);
        }}
      />
      <IconButton
        icon={isSelected(comWid) ? 'RemoveCircleHalfDot' : 'AddCircleHalfDot'}
        postfix={isSelected(comWid) ? 'Отменить выбор' : 'Выбрать'}
        onClick={() => toggleSelectedCom(comWid)}
      />
      {!selectedComws.length || (
        <IconButton
          icon="CancelCircleHalfDot"
          postfix="Очистить выбранные"
          onClick={() => {
            confirm('Очистить список выбранных?').then(isClear => isClear && clearSelectedComws());
          }}
        />
      )}
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  > * {
    margin: 20px 10px;
  }

  > :first-child,
  > :last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
