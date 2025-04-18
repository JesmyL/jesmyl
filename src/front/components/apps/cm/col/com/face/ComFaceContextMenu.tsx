import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { useFavouriteComs } from '$cm/lists/favourites/useFavouriteComs';
import { CmComWid } from 'shared/api';
import styled from 'styled-components';

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
    <StyledMenu>
      <TheIconButton
        icon={isComMarked ? 'Star' : 'StarCircle'}
        postfix={isComMarked ? 'Удалить из Избранного' : 'Добавить в Избранное'}
        onClick={() => {
          onClick(null);
          toggleFavourite(comWid);
        }}
      />
      <TheIconButton
        icon={isSelected(comWid) ? 'RemoveCircleHalfDot' : 'AddCircleHalfDot'}
        postfix={isSelected(comWid) ? 'Отменить выбор' : 'Выбрать'}
        onClick={() => {
          onClick(null);
          toggleSelectedCom(comWid);
        }}
      />
      {!selectedComws.length || (
        <TheIconButton
          icon="CancelCircleHalfDot"
          postfix="Очистить выбранные"
          onClick={async () => {
            if (!(await confirm('Очистить список выбранных?'))) return;
            onClick(null);
            clearSelectedComws();
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
