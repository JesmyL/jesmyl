import { IconLink02StrokeRounded } from 'front/complect/the-icon/icons/link-02';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator';
import { BottomPopupItem } from '../../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { IconArrowDataTransferDiagonalStrokeRounded } from '../../../../../../../../../complect/the-icon/icons/arrow-data-transfer-diagonal';
import { OrdersRedactorOrderToolsProps } from '../OrdersRedactorOrderTools';

export const OrdersRedactorOrderToolsMoveBlock = (props: OrdersRedactorOrderToolsProps) => {
  return (
    <BottomPopupItem
      Icon={IconArrowDataTransferDiagonalStrokeRounded}
      title="Переместить блок"
      onClick={async () => {
        props.onClose(false);
        let isFoundTargetOrd = !props.ord.isAnchor;

        props.setClickBetweenOrds({
          buttonTitle: (
            <span className="flex flex-gap">
              {props.ord.isAnchor && <IconLink02StrokeRounded />}
              <span className="color--7">{props.ord.me.header()}</span> будет тут
            </span>
          ),
          checkIsShowButton: (ordAbove, ordBelow) => {
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
