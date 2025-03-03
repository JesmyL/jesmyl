import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheButton } from '#shared/ui/TheButton';
import { ChordVisibleVariant } from '@cm/Cm.model';
import { TheOrder } from '@cm/col/com/order/TheOrder';
import { cmComOrderClientInvocatorMethods } from '@cm/editor/lib/cm-editor-invocator.methods';
import { EditableCom } from '@cm/editor/lib/EditableCom';
import { useState } from 'react';
import styled from 'styled-components';
import { useEditableCcom } from '../../../../lib/useEditableCom';
import { CmComOrderOnClickBetweenData } from '../model';
import { OrdersRedactorAdditions } from './Additions';
import { OrdersRedactorOrderToolsProps } from './Tools/model';
import { OrdersRedactorOrderTools } from './Tools/ui';

export const CmOrdersRedactorTab = () => {
  const ccom = useEditableCcom();
  const [newBlockAdderPopupCom, setNewBlockAdderPopupCom] = useState<EditableCom | false>(false);
  const [toolProps, setToolProps] = useState<OrdersRedactorOrderToolsProps | false>(false);
  const [clickBetweenData, setClickBetweenOrds] = useState<CmComOrderOnClickBetweenData | null>(null);

  if (!ccom) return null;

  return (
    <StyledOrdersRedactor>
      <>
        {newBlockAdderPopupCom && (
          <BottomPopup
            isPreventCloseOnClick
            onClose={setNewBlockAdderPopupCom}
          >
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
            onClick={() =>
              setToolProps({
                com: ccom,
                onClose: setToolProps,
                ord,
                ordi,
                setClickBetweenOrds,
              })
            }
          />
        );
        const isWithHead = ord.isWithHead();

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
            {ordi === 0 && clickBetweenData && clickBetweenData.checkIsShowButton(null, ord) && (
              <div className="flex flex-gap margin-big-gap-t center">
                <TheButton
                  onClick={async () => {
                    try {
                      await clickBetweenData.onClick(null, ord);
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
                <IconButton
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

                    return cmComOrderClientInvocatorMethods.toggleAnchorInheritVisibility(
                      null,
                      ord.com.wid,
                      ord.me.leadOrd.wid,
                      ord.me.anchorInheritIndex,
                      ord.me.leadOrd.me.header(),
                    );
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
                        <>
                          {headerNode}
                          {isWithHead ? editNode : null}
                        </>
                      );
                    }
              }
            />
            {clickBetweenData && clickBetweenData.checkIsShowButton(ord, orda[ordi + 1] ?? null) && (
              <div className="flex flex-gap center margin-big-gap-t">
                <TheButton
                  onClick={async () => {
                    try {
                      await clickBetweenData.onClick(ord, orda[ordi + 1] ?? null);
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
        <BottomPopup
          onClose={setToolProps}
          isPreventCloseOnClick
        >
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
