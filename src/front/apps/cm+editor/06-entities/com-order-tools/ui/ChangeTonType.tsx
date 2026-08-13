import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsChangeTonType = ({
  com,
  ord,
  onEdit,
}: Pick<CmEditorComOrderToolsProps, 'ord' | 'com'> & { onEdit?: () => Promise<unknown> }) => {
  const confirm = useConfirm();

  return (
    <>
      <BottomPopupItem
        icon="Grid"
        title={`${ord.isBemoledSwitch ? 'Снять' : 'Установить'} смену типа тональности`}
        onClick={async () => {
          const is = await confirm(
            <>
              В этом блоке и после него тип тональности будет{' '}
              <span className="text-x7">{ord.isBemoledSwitch ? 'диезный' : 'бемольный'}</span>
            </>,
          );

          if (is)
            if (onEdit) await onEdit();
            else
              await cmEditComOrderClientTsjrpcMethods.isBmSwitch({
                comw: com.wid,
                ordw: ord.wid,
              });
        }}
      />
    </>
  );
};
