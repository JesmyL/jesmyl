import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmEditorComOrderToolsProps } from '../model';

export const CmEditorComOrderToolsAnchor = ({ com, ord, onClose, setClickBetweenOrds }: CmEditorComOrderToolsProps) => {
  return (
    <>
      <BottomPopupItem
        icon="Link02"
        title={`Ссылка на ${ord.me.header()}`}
        onClick={() => {
          onClose(false);
          let isAboveOrdAfterTarget = false;

          setClickBetweenOrds({
            buttonTitle: (
              <>
                Ссылка на <span className="text-x7">{ord.me.header()}</span>
              </>
            ),
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
