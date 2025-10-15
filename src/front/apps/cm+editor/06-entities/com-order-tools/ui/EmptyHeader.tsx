import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsEmptyHeader = (props: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Message01"
        title={`${props.ord.isEmptyHeader ? 'Вернуть' : 'Убрать'} название блока`}
        onClick={async () => {
          await cmEditComOrderClientTsjrpcMethods.toggleTitleVisibility({
            orderTitle: props.ord.me.header(),
            comw: props.com.wid,
            ordw: props.ord.wid,
          });
          props.onClose(false);
        }}
      />
    </>
  );
};
