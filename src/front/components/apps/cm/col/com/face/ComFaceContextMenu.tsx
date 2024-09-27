import styled from 'styled-components';
import { CmComWid } from '../../../../../../../back/apps/cm/Cm.enums';
import { useConfirm } from '../../../../../../complect/modal/confirm/useConfirm';
import IconButton from '../../../../../../complect/the-icon/IconButton';
import { IconAddCircleHalfDotStrokeRounded } from '../../../../../../complect/the-icon/icons/add-circle-half-dot';
import { IconCancelCircleHalfDotStrokeRounded } from '../../../../../../complect/the-icon/icons/cancel-circle-half-dot';
import { IconRemoveCircleHalfDotStrokeRounded } from '../../../../../../complect/the-icon/icons/remove-circle-half-dot';
import { IconStarSolidRounded, IconStarStrokeRounded } from '../../../../../../complect/the-icon/icons/star';
import { useAuth } from '../../../../../index/molecules';
import useSelectedComs from '../../../base/useSelectedComs';
import ComFaceContextMenuEditorItems from '../../../editor/col/compositions/ComFaceContextMenuEditorItems';
import { useMarks } from '../../../lists/marks/useMarks';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export default function ComFaceContextMenu({ onClick, comWid }: Props) {
  const { isMarked, toggleMarked } = useMarks();
  const isComMarked = isMarked(comWid);
  const { clearSelectedComws, selectedComws, selectedComPosition: isSelected, toggleSelectedCom } = useSelectedComs();
  const [confirmNode, confirm] = useConfirm();
  const auth = useAuth();

  return (
    <StyledMenu>
      {confirmNode}
      <IconButton
        Icon={isComMarked ? IconStarStrokeRounded : IconStarSolidRounded}
        postfix={isComMarked ? 'Удалить из Избранного' : 'Добавить в Избранное'}
        onClick={() => {
          onClick(null);
          toggleMarked(comWid);
        }}
      />
      <IconButton
        Icon={isSelected(comWid) ? IconRemoveCircleHalfDotStrokeRounded : IconAddCircleHalfDotStrokeRounded}
        postfix={isSelected(comWid) ? 'Отменить выбор' : 'Выбрать'}
        onClick={() => toggleSelectedCom(comWid)}
      />
      {!selectedComws.length || (
        <IconButton
          Icon={IconCancelCircleHalfDotStrokeRounded}
          postfix="Очистить выбранные"
          onClick={() => {
            confirm('Очистить список выбранных?').then(isClear => isClear && clearSelectedComws());
          }}
        />
      )}
      {auth.level > 49 && <ComFaceContextMenuEditorItems />}
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
