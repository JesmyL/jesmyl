import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsHiddenOnMin = (props: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={`${props.ord.isOpened ? 'Скрывать' : 'Показывать'} в свёрнутом режиме`}
        onClick={async () => {
          await cmEditComOrderClientTsjrpcMethods.toggleVisibilityInMiniMode({
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
