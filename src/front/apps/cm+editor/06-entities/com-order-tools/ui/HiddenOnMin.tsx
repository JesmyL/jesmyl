import { translateBase } from '#basis/locale';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsHiddenOnMin = (props: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={translateBase(it =>
          props.ord.isOpened ? it[BaseLocaleKey.CmEditorHideInCollapsed] : it[BaseLocaleKey.CmEditorShowInCollapsed],
        )}
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
