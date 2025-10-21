import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorComOrderToolsProps } from '../model';
import { CmEditorComOrderToolsAnchor } from './Anchor';
import { CmEditorComOrderToolsAnchorDelete } from './AnchorDelete';
import { CmEditorComOrderToolsBlockType } from './BlockType';
import { CmEditorComOrderToolsChangeText } from './ChangeText';
import { CmEditorComOrderToolsChordBind } from './ChordBind';
import { CmEditorComOrderToolsEmptyHeader } from './EmptyHeader';
import { CmEditorComOrderToolsHiddenOnMin } from './HiddenOnMin';
import { CmEditorComOrderToolsModulation } from './Modulation';
import { CmEditorComOrderToolsMoveBlock } from './MoveBlock';
import { CmEditorComOrderToolsOrderVisibility } from './Visibility';

export const CmEditorComOrderToolsRedactorOrderTools = (props: CmEditorComOrderToolsProps) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <>
      <CmEditorComOrderToolsBlockType {...props} />
      <CmEditorComOrderToolsChordBind {...props} />
      {!props.ord.isAnchor ? (
        <>
          {props.ord.texti == null || <CmEditorComOrderToolsChangeText {...props} />}
          {checkAccess('cm', 'COM_ORD', 'C') && (props.ord.me.isInherit || <CmEditorComOrderToolsAnchor {...props} />)}
        </>
      ) : (
        <>
          <CmEditorComOrderToolsHiddenOnMin {...props} />
        </>
      )}
      <CmEditorComOrderToolsOrderVisibility {...props} />
      {props.ord.me.style?.isModulation && <CmEditorComOrderToolsModulation {...props} />}

      <CmEditorComOrderToolsEmptyHeader {...props} />
      <CmEditorComOrderToolsMoveBlock {...props} />
      {checkAccess('cm', 'COM_ORD', 'D') && <CmEditorComOrderToolsAnchorDelete {...props} />}
    </>
  );
};
