import { translateBase } from '#basis/locale';
import { DisabledArea } from '#shared/ui/DisabledArea';
import { useConfirm } from '#shared/ui/modal';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { twMerge } from 'tailwind-merge';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsAnchorDelete = ({ com, ord, onClose }: CmEditorComOrderToolsProps) => {
  const confirm = useConfirm();
  const ifAnchorSuffix = ord.isAnchor ? `${translateBase(BaseLocaleKey.CmEditorLinkToBlock, { h: '' })}` : '';
  const isDisabled = ord.me.prev == null && ord.me.isNextInherit;

  return (
    <DisabledArea
      disabled={isDisabled}
      disabledReason={translateBase(BaseLocaleKey.CmEditorNextIsContinuation)}
      onClick={async () => {
        if (
          !(await confirm(
            <>
              {translateBase(BaseLocaleKey.CmEditorDeleteBlock)} <span className="text-x7">{ord.me.header()}</span>?
              {ord.top.p?.flat().length ? ` ${translateBase(BaseLocaleKey.CmEditorAppliqueDestroyed)}` : ''}
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
          title={`${translateBase(BaseLocaleKey.CmEditorDeleteBlock)} ${ifAnchorSuffix}${ord.me.header()}`}
          onClick={onClick}
        />
      )}
    </DisabledArea>
  );
};
