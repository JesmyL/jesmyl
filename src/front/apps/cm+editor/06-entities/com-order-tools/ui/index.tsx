import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorComOrderToolsProps } from '../model';
import { CmEditorComOrderToolsAnchor } from './Anchor';
import { CmEditorComOrderToolsAnchorDelete } from './AnchorDelete';
import { CmEditorComOrderToolsBlockKind } from './BlockKind';
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
      <CmEditorComOrderToolsBlockKind {...props} />
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
      {props.ord.me.kind?.isModulation && <CmEditorComOrderToolsModulation {...props} />}

      <CmEditorComOrderToolsEmptyHeader {...props} />
      <CmEditorComOrderToolsMoveBlock {...props} />
      {(checkAccess('cm', 'COM_ORD', 'D') ||
        (checkAccess('cm', 'COM_ORD', 'U') && props.com.wid > Date.now() - 24 * 60 * 60 * 1000)) && (
        <CmEditorComOrderToolsAnchorDelete {...props} />
      )}
    </>
  );
};
