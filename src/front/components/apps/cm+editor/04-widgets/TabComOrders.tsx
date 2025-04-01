import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import { cmComOrderClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { CmComOrderOnClickBetweenData } from '$cm+editor/basis/model/Orders';
import { OrdersRedactorAdditions } from '$cm+editor/features/EditOrderAddBlock';
import { OrdersRedactorOrderTools } from '$cm+editor/features/EditOrderTools';
import { OrdersRedactorOrderToolsProps } from '$cm+editor/features/EditOrderTools/model';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheOrder } from '$cm/col/com/order/TheOrder';
import { useState } from 'react';
import styled from 'styled-components';

export const CmEditorTabComOrders = () => {
  const ccom = useEditableCcom();
  const [newBlockAdderPopupCom, setNewBlockAdderPopupCom] = useState<EditableCom | false>(false);
  const [toolProps, setToolProps] = useState<OrdersRedactorOrderToolsProps | false>(false);
  const [clickBetweenData, setClickBetweenOrds] = useState<CmComOrderOnClickBetweenData | null>(null);

  if (!ccom) return null;

  return (
    <StyledOrdersRedactor>
      <>
        {newBlockAdderPopupCom && (
          <BottomPopup onClose={setNewBlockAdderPopupCom}>
            <OrdersRedactorAdditions
              com={newBlockAdderPopupCom}
              onClose={setNewBlockAdderPopupCom}
              setClickBetweenOrds={setClickBetweenOrds}
            />
          </BottomPopup>
        )}
      </>
      {ccom.orders?.map((ord, ordi, orda) => {
        const editNode = !ord.me.isAnchorInherit && (
          <LazyIcon
            icon={ord.isAnchor ? 'Link02' : 'Edit02'}
            className="margin-gap-h margin-gap-b pointer vertical-middle"
            onClick={() => setToolProps({ com: ccom, onClose: setToolProps, ord, ordi, setClickBetweenOrds })}
          />
        );
        const isWithHead = ord.isWithHead();
        const betweenProps = {
          ordAbove: ord,
          aboveLeadOrdw: ord?.me.isAnchorInherit ? ord?.me.leadOrd?.wid : ord?.wid,
          ordBelow: orda[ordi + 1] ?? null,
        };
        const zeroProps = {
          aboveLeadOrdw: null,
          ordAbove: null,
          ordBelow: ord,
        };

        const cancelClickBetweenDataButtonNode = (
          <LazyIcon
            icon="Cancel01"
            className="pointer color--ko"
            onClick={() => setClickBetweenOrds(null)}
          />
        );

        return (
          <div
            key={ordi}
            className={ord.me.isAnchorInherit ? 'inherit-block' : ''}
          >
            {ordi === 0 && clickBetweenData && clickBetweenData.checkIsShowButton(zeroProps) && (
              <div className="flex flex-gap margin-big-gap-t center">
                <TheButton
                  onClick={async () => {
                    try {
                      await clickBetweenData.onClick(zeroProps);
                    } catch (_error) {
                      //
                    }
                    setClickBetweenOrds(null);
                  }}
                >
                  {clickBetweenData.buttonTitle}
                </TheButton>
                {cancelClickBetweenDataButtonNode}
              </div>
            )}
            <div className="margin-big-gap-h">
              {isWithHead ? null : ord.me.isAnchorInherit && ord.me.leadOrd && ord.me.anchorInheritIndex != null ? (
                <TheIconButton
                  icon={ord.isVisible ? 'View' : 'ViewOffSlash'}
                  confirm={
                    <>
                      Сделать {ord.me.anchorInheritIndex + 2}-ю часть ссылки на
                      <span className="color--7"> {ord.me.leadOrd.me.header()} </span>
                      {ord.me.leadOrd.top.inh?.v?.[ord.me.anchorInheritIndex] == null ? 'не' : ''}видимой?
                    </>
                  }
                  onClick={() => {
                    if (ord.me.anchorInheritIndex == null || ord.me.leadOrd == null) return;

                    return cmComOrderClientInvocatorMethods.toggleAnchorInheritVisibility({
                      comw: ord.com.wid,
                      leadOrderWid: ord.me.leadOrd.wid,
                      anchorInheritIndex: ord.me.anchorInheritIndex,
                      leadOrderTitle: ord.me.leadOrd.me.header(),
                    });
                  }}
                />
              ) : (
                editNode
              )}
            </div>
            <TheOrder
              orderUnit={ord}
              orderUniti={ordi}
              com={ccom}
              showInvisibles
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              asHeaderComponent={
                clickBetweenData
                  ? undefined
                  : ({ headerNode }) => {
                      return (
                        <div className="flex">
                          {headerNode}
                          {isWithHead ? editNode : null}
                        </div>
                      );
                    }
              }
            />
            {clickBetweenData && clickBetweenData.checkIsShowButton(betweenProps) && (
              <div className="flex gap-3 justify-center mt-5">
                <TheButton
                  onClick={async () => {
                    try {
                      await clickBetweenData.onClick(betweenProps);
                    } catch (_error) {
                      //
                    }
                    setClickBetweenOrds(null);
                  }}
                >
                  {clickBetweenData.buttonTitle}
                </TheButton>
                {cancelClickBetweenDataButtonNode}
              </div>
            )}
          </div>
        );
      })}
      {!clickBetweenData && (
        <div className="flex center margin-big-gap">
          <LazyIcon
            icon="PlusSignCircle"
            className="pointer margin-gap-h"
            onClick={() => setNewBlockAdderPopupCom(ccom)}
          />
        </div>
      )}
      {toolProps && (
        <BottomPopup onClose={setToolProps}>
          <OrdersRedactorOrderTools {...toolProps} />
        </BottomPopup>
      )}
    </StyledOrdersRedactor>
  );
};

const StyledOrdersRedactor = styled.div`
  --icon-color: var(--color--7);

  .order-changes-buttons {
    > * {
      margin-right: var(--main-gap);
    }
  }

  .inherit-block {
    opacity: 0.2;
    color: var(--color--7);
  }
`;
