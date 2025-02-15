import styled from 'styled-components';
import { CmComWid } from '../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { useConfirm } from '../../../../../../complect/modal/confirm/useConfirm';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import useSelectedComs from '../../../base/useSelectedComs';
import { useFavoriteComs } from '../../../lists/favorites/useFavoriteComs';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export default function ComFaceContextMenu({ onClick, comWid }: Props) {
  const { isMarked, toggleMarked } = useFavoriteComs();
  const isComMarked = isMarked(comWid);
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
          toggleMarked(comWid);
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
