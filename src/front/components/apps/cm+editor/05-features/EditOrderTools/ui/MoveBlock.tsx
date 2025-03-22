import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsMoveBlock = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <BottomPopupItem
      icon="ArrowDataTransferDiagonal"
      title="Переместить блок"
      onClick={async () => {
        props.onClose(false);
        let isFoundTargetOrd = !props.ord.isAnchor;
        let isFoundFirstAnchorOrd = false;

        props.setClickBetweenOrds({
          buttonTitle: (
            <span className="flex flex-gap">
              {props.ord.isAnchor && <LazyIcon icon="Link02" />}
              <span className="color--7">{props.ord.me.header()}</span> будет тут
            </span>
          ),
          checkIsShowButton: (ordAbove, ordBelow) => {
            if (ordBelow?.me.isAnchorInherit) return false;

            if (isFoundFirstAnchorOrd || ordAbove?.me.targetOrd?.wid === props.ord.wid) {
              isFoundFirstAnchorOrd = ordBelow != null;
              return false;
            }

            let isFoundTargetOrdPrev: boolean = true;

            if (props.ord.isAnchor) {
              isFoundTargetOrd ||= ordAbove?.wid === props.ord.anchor;
              isFoundTargetOrdPrev = isFoundTargetOrd;
              if (ordBelow == null) isFoundTargetOrd = false;
            }

            if (ordBelow === null && props.com.orders?.length === props.ordi + 1) return false;
            if (ordAbove === null && props.ordi === 0) return false;
            if (ordAbove?.wid === props.ord.wid || ordBelow?.wid === props.ord.wid) return false;

            return isFoundTargetOrdPrev;
          },
          onClick: async ordAbove => {
            await cmComOrderClientInvocatorMethods.moveOrdAfter(
              null,
              props.ord.wid,
              props.ord.me.header(),
              props.com.wid,
              ordAbove?.wid,
            );
          },
        });
      }}
    />
  );
};
