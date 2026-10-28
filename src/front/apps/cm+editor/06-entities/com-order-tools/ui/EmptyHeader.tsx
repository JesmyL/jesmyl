import { translateEditorBase } from '#basis/locale';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsEmptyHeader = (props: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Message01"
        title={
          props.ord.isEmptyHeader
            ? translateEditorBase(EditorLocaleKey.CmEditorRestoreBlockName)
            : translateEditorBase(EditorLocaleKey.CmEditorRemoveBlockName)
        }
        onClick={async () => {
          await cmEditComOrderClientTsjrpcMethods.toggleTitleVisibility({
            comw: props.com.wid,
            ordw: props.ord.wid,
          });
          props.onClose(false);
        }}
      />
    </>
  );
};
