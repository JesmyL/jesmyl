import { translateBase } from '#basis/locale';
import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
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
            ? translateBase(BaseLocaleKey.CmEditorRemoveTonalitySwitch)
            : translateBase(BaseLocaleKey.CmEditorSetTonalitySwitch)
        }
        onClick={async () => {
          const is = await confirm(
            <>
              {translateBase(BaseLocaleKey.CmEditorTonalityTypeWillBe)}{' '}
              <span className="text-x7">
                {ord.isBemoledSwitch
                  ? translateBase(BaseLocaleKey.CmEditorSharp)
                  : translateBase(BaseLocaleKey.CmEditorFlat)}
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
