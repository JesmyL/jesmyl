import TheButton from 'front/complect/Button';
import IconButton from 'front/complect/the-icon/IconButton';
import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { cmComOrderClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { useState } from 'react';
import { BottomPopup } from '../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import { ChordVisibleVariant } from '../../../../../Cm.model';
import TheOrder from '../../../../../col/com/order/TheOrder';
import { EditableCom } from '../../com/EditableCom';
import { useEditableCcom } from '../../useEditableCcom';
import { OrdersRedactorOrderTools, OrdersRedactorOrderToolsProps } from './OrdersRedactorOrderTools';
import { OrdersRedactorAdditions } from './additions/Additions';
import { CmComOrderOnClickBetweenData } from './model';

export default function OrdersRedactor() {
  const ccom = useEditableCcom();
  const [newBlockAdderPopupCom, setNewBlockAdderPopupCom] = useState<EditableCom | false>(false);
  const [toolProps, setToolProps] = useState<OrdersRedactorOrderToolsProps | false>(false);
  const [clickBetweenData, setClickBetweenOrds] = useState<CmComOrderOnClickBetweenData | null>(null);

  if (!ccom) return null;

  return (
    <div className="orders-redactor">
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
                    } catch (e) {}
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
                    } catch (e) {}
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
    </div>
  );
}
