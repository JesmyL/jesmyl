import { translateEditorBase } from '#basis/locale';
import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
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
        title={
          ord.isBemoledSwitch
            ? translateEditorBase(EditorLocaleKey.CmEditorRemoveTonalitySwitch)
            : translateEditorBase(EditorLocaleKey.CmEditorSetTonalitySwitch)
        }
        onClick={async () => {
          const is = await confirm(
            <>
              {translateEditorBase(EditorLocaleKey.CmEditorTonalityTypeWillBe)}{' '}
              <span className="text-x7">
                {ord.isBemoledSwitch
                  ? translateEditorBase(EditorLocaleKey.CmEditorSharp)
                  : translateEditorBase(EditorLocaleKey.CmEditorFlat)}
              </span>
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
