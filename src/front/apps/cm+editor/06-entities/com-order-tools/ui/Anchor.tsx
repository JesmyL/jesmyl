import { translateEditorBase } from '#basis/locale';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsAnchor = ({ com, ord, onClose, setClickBetweenOrds }: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={translateEditorBase(EditorLocaleKey.CmEditorLinkToBlock, { h: ord.me.header() })}
        onClick={() => {
          onClose(false);
          let isAboveOrdAfterTarget = false;

          setClickBetweenOrds({
            buttonTitle: <>{translateEditorBase(EditorLocaleKey.CmEditorLinkToBlock, { h: ord.me.header() })}</>,
            onClick: async ({ aboveLeadOrdw }) => {
              if (aboveLeadOrdw == null) return;

              cmEditComOrderClientTsjrpcMethods.addAnchorOrder({
                orderTitle: ord.me.header(),
                comw: com.wid,
                targetOrdw: ord.wid,
                insertAfterOrdw: aboveLeadOrdw,
              });
            },
            checkIsShowButton: ({ ordAbove, ordBelow }) => {
              if (!isAboveOrdAfterTarget) isAboveOrdAfterTarget = ordAbove?.wid === ord.wid;
              const canShow = isAboveOrdAfterTarget;
              if (ordBelow === null) isAboveOrdAfterTarget = false;

              return canShow;
            },
          });
        }}
      />
    </>
  );
};
