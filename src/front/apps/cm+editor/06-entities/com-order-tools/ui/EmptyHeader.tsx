import { translateBase } from '#basis/locale';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsEmptyHeader = (props: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Message01"
        title={translateBase(it =>
          props.ord.isEmptyHeader ? it[BaseLocaleKey.CmEditorRestoreBlockName] : it[BaseLocaleKey.CmEditorRemoveBlockName],
        )}
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
