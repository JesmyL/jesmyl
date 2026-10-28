import { translateEditorBase } from '#basis/locale';
import { DisabledArea } from '#shared/ui/DisabledArea';
import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { twMerge } from 'tailwind-merge';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsAnchorDelete = ({ com, ord, onClose }: CmEditorComOrderToolsProps) => {
  const confirm = useConfirm();
  const ifAnchorSuffix = ord.isAnchor ? `${translateEditorBase(EditorLocaleKey.CmEditorLinkToBlock, { h: '' })}` : '';
  const isDisabled = ord.me.prev == null && ord.me.isNextInherit;

  return (
    <DisabledArea
      disabled={isDisabled}
      disabledReason={translateEditorBase(EditorLocaleKey.CmEditorNextIsContinuation)}
      onClick={async () => {
        if (
          !(await confirm(
            <>
              {translateEditorBase(EditorLocaleKey.CmEditorDeleteBlock)} <span className="text-x7">{ord.me.header()}</span>?
              {ord.top.p?.flat().length ? ` ${translateEditorBase(EditorLocaleKey.CmEditorAppliqueDestroyed)}` : ''}
            </>,
          ))
        )
          return;

        await cmEditComOrderClientTsjrpcMethods.remove({
          comw: com.wid,
          ordw: ord.wid,
        });
        onClose(false);
      }}
    >
      {({ className, onClick }) => (
        <BottomPopupItem
          icon="Delete02"
          className={twMerge('text-xKO', className)}
          title={`${translateEditorBase(EditorLocaleKey.CmEditorDeleteBlock)} ${ifAnchorSuffix}${ord.me.header()}`}
          onClick={onClick}
        />
      )}
    </DisabledArea>
  );
};
