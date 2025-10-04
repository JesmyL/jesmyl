import { DisabledArea } from '#shared/ui/DisabledArea';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { OrdersRedactorOrderToolsProps } from '../model';

export const OrdersRedactorOrderToolsMoveBlock = (props: OrdersRedactorOrderToolsProps) => {
  const isDisabled = props.ord.me.prev == null && props.ord.me.isNextInherit;

  return (
    <DisabledArea
      disabled={isDisabled}
      disabledReason="Следующий блок - продолжение"
      onClick={async () => {
        props.onClose(false);
        let isFoundTargetOrd = !props.ord.isAnchor;
        let isFoundFirstAnchorOrd = false;

        props.setClickBetweenOrds({
          buttonTitle: (
            <span className="flex gap-2">
              {props.ord.isAnchor && <LazyIcon icon="Link02" />}
              <span className="text-x7">{props.ord.me.header()}</span> будет тут
            </span>
          ),
          checkIsShowButton: ({ ordAbove, ordBelow }) => {
            if (ordAbove == null && props.ord?.me.isInherit) return false;
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
          onClick: async ({ aboveLeadOrdw }) => {
            await cmEditComOrderClientTsjrpcMethods.moveOrdAfter({
              ordw: props.ord.wid,
              orderTitle: props.ord.me.header(),
              comw: props.com.wid,
              insertAfterOrdwOrFirst: aboveLeadOrdw,
            });
          },
        });
      }}
    >
      {({ onClick, className }) => (
        <BottomPopupItem
          icon="ArrowDataTransferDiagonal"
          title="Переместить блок"
          className={className}
          onClick={onClick}
        />
      )}
    </DisabledArea>
  );
};
