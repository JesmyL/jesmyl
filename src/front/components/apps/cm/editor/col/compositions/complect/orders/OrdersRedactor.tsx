import { useState } from 'react';
import { BottomPopup } from '../../../../../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import { useExerExec } from '../../../../../../../../complect/exer/hooks/useExer';
import { IconArrowDataTransferVerticalStrokeRounded } from '../../../../../../../../complect/the-icon/icons/arrow-data-transfer-vertical';
import { IconEdit02StrokeRounded } from '../../../../../../../../complect/the-icon/icons/edit-02';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../../complect/the-icon/icons/plus-sign-circle';
import { IconViewStrokeRounded } from '../../../../../../../../complect/the-icon/icons/view';
import { IconViewOffSlashStrokeRounded } from '../../../../../../../../complect/the-icon/icons/view-off-slash';
import { ChordVisibleVariant } from '../../../../../Cm.model';
import TheOrder from '../../../../../col/com/order/TheOrder';
import { EditableCom } from '../../com/EditableCom';
import { useEditableCcom } from '../../useEditableCcom';
import { OrdersRedactorOrderTools, OrdersRedactorOrderToolsProps } from './OrdersRedactorOrderTools';
import { OrdersRedactorAdditions } from './additions/Additions';

export default function OrdersRedactor() {
  const ccom = useEditableCcom();
  const [newBlockAdderPopupCom, setNewBlockAdderPopupCom] = useState<EditableCom | false>(false);
  const exec = useExerExec();
  const [toolProps, setToolProps] = useState<OrdersRedactorOrderToolsProps | false>(false);

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
            />
          </BottomPopup>
        )}
      </>
      {ccom.orders?.map((ord, ordi, orda) => {
        const leadHeader = ord.me.header(
          {
            isEdit: true,
            isTexted: ord.me.isInherit,
            repeats: ord.repeatsTitle,
          },
          true,
        );
        const blockHeader = ord.me.isInherit ? `${leadHeader} ${ord.type}` : leadHeader;

        const editNode = !ord.me.isAnchorInherit && (
          <IconEdit02StrokeRounded
            className="margin-gap-h margin-gap-b pointer vertical-middle"
            onClick={() => setToolProps({ blockHeader, ccom, onClose: setToolProps, ord, ordi })}
          />
        );
        const isWithHead = ord.isWithHead();
        const Icon = ord.isVisible ? IconViewStrokeRounded : IconViewOffSlashStrokeRounded;

        return (
          <div
            key={ordi}
            className={ord.me.isAnchorInherit ? 'inherit-block' : ''}
          >
            <div className="margin-big-gap-h">
              {isWithHead ? null : ord.me.isAnchorInherit ? (
                <Icon
                  onClick={() => {
                    exec(
                      ord.setField('v', ord.antiIsVisible, {
                        b: blockHeader,
                      }),
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
              asHeaderComponent={({ headerNode }) => {
                return (
                  <>
                    {headerNode}
                    {isWithHead ? editNode : null}
                  </>
                );
              }}
            />
            {ccom.isImpossibleToMigrateOrder(ord, ordi, orda) || (
              <IconArrowDataTransferVerticalStrokeRounded
                className={`pointer ${ccom.isCantResortOrder(ord, ordi) ? 'disabled' : ''}`}
                onClick={() => exec(ccom.resortOrder(ord))}
              />
            )}
          </div>
        );
      })}
      <div className="flex">
        <IconPlusSignCircleStrokeRounded
          className="pointer margin-gap-h"
          onClick={() => setNewBlockAdderPopupCom(ccom)}
        />
      </div>
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
