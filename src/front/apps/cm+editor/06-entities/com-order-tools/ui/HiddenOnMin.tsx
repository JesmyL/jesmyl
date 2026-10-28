import { translateEditorBase } from '#basis/locale';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsHiddenOnMin = (props: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={
          props.ord.isOpened
            ? translateEditorBase(EditorLocaleKey.CmEditorHideInCollapsed)
            : translateEditorBase(EditorLocaleKey.CmEditorShowInCollapsed)
        }
        onClick={async () => {
          await cmEditComOrderClientTsjrpcMethods.toggleVisibilityInMiniMode({
            comw: props.com.wid,
            ordw: props.ord.wid,
          });

          props.onClose(false);
        }}
      />
    </>
  );
};
