import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsAnchor = ({
  com,
  ord,
  onClose,
  setClickBetweenOrds,
}: OrdersRedactorOrderToolsProps) => {
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
                Ссылка на <span className="color--7">{ord.me.header()}</span>
              </>
            ),
            onClick: async ({ aboveLeadOrdw }) => {
              if (aboveLeadOrdw == null) return;

              cmComOrderClientInvocatorMethods.addAnchorOrder(null, ord.me.header(), com.wid, ord.wid, aboveLeadOrdw);
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
