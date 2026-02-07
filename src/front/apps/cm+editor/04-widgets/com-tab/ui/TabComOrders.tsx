import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheButton } from '#shared/ui/TheButton';
import {
  CmEditorComOrderToolsProps,
  CmEditorComOrderToolsRedactorOrderTools,
} from '$cm+editor/entities/com-order-tools';
import { CmEditorComAddOrderRedactorAdditions } from '$cm+editor/features/com-add-order';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrderOnClickBetweenData } from '$cm+editor/shared/model/Orders';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import React, { useState } from 'react';
import styled from 'styled-components';

export const CmEditorComTabComOrders = ({ ccom }: { ccom: EditableCom }) => {
  const [newBlockAdderPopupCom, setNewBlockAdderPopupCom] = useState<EditableCom | false>(false);
  const [toolProps, setToolProps] = useState<CmEditorComOrderToolsProps | false>(false);
  const [clickBetweenData, setClickBetweenOrds] = useState<CmComOrderOnClickBetweenData | null>(null);
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCanCreate = checkAccess('cm', 'COM_ORD', 'C');
  const isCanUpdate = checkAccess('cm', 'COM_ORD', 'U');

  if (!ccom) return null;

  const zeroProps = {
    aboveLeadOrdw: null,
    ordAbove: null,
    ordBelow: ccom.orders?.[0] ?? null,
  };

  const cancelClickBetweenDataButtonNode = (
    <LazyIcon
      icon="Cancel01"
      className="pointer text-xKO"
      onClick={() => setClickBetweenOrds(null)}
    />
  );

  return (
    <StyledOrdersRedactor>
      <>
        {newBlockAdderPopupCom && (
          <BottomPopup onClose={setNewBlockAdderPopupCom}>
            <CmEditorComAddOrderRedactorAdditions
              com={newBlockAdderPopupCom}
              onClose={setNewBlockAdderPopupCom}
              setClickBetweenOrds={setClickBetweenOrds}
            />
          </BottomPopup>
        )}
      </>

      {clickBetweenData && clickBetweenData.checkIsShowButton(zeroProps) && (
        <div className="flex gap-2 mt-5 center">
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
      {ccom.orders?.map((ord, ordi, orda) => {
        const editNode = isCanUpdate && !ord.me.isAnchorInherit && (
          <LazyIcon
            icon={ord.isAnchor ? 'Link02' : 'Edit02'}
            className="mx-2 mb-2 pointer align-middle"
            onClick={() => setToolProps({ com: ccom, onClose: setToolProps, ord, ordi, setClickBetweenOrds })}
          />
        );
        const isWithHead = ord.isWithHead();
        const betweenProps = {
          ordAbove: ord,
          aboveLeadOrdw: ord?.me.isAnchorInherit ? ord?.me.leadOrd?.wid : ord?.wid,
          ordBelow: orda[ordi + 1] ?? null,
        };

        return (
          <React.Fragment key={ordi}>
            <div className={ord.me.isAnchorInherit ? 'inherit-block' : ''}>
              <div className="mx-10 mt-2">
                {clickBetweenData || isWithHead ? null : ord.me.isAnchorInherit &&
                  ord.me.leadOrd &&
                  ord.me.anchorInheritIndex != null ? (
                  <TheIconButton
                    icon={ord.isVisible ? 'View' : 'ViewOffSlash'}
                    confirm={
                      <>
                        Сделать {ord.me.anchorInheritIndex + 2}-ю часть ссылки на
                        <span className="text-x7"> {ord.me.leadOrd.me.header()} </span>
                        {ord.me.leadOrd.top._v?.[ord.me.anchorInheritIndex] == null ? 'не' : ''}видимой?
                      </>
                    }
                    onClick={() => {
                      if (ord.me.anchorInheritIndex == null || ord.me.leadOrd == null) return;

                      return cmEditComOrderClientTsjrpcMethods.toggleAnchorInheritVisibility({
                        comw: ord.com.wid,
                        ordw: ord.me.leadOrd.wid,
                        inhi: ord.me.anchorInheritIndex,
                        leadOrderTitle: ord.me.leadOrd.me.header(),
                      });
                    }}
                  />
                ) : (
                  editNode
                )}
              </div>

              <TheCmComOrder
                ord={ord}
                ordi={ordi}
                com={ccom}
                chordHardLevel={3}
                showInvisibles
                chordVisibleVariant={ChordVisibleVariant.Maximal}
                asHeaderComponent={
                  clickBetweenData
                    ? undefined
                    : ({ headerNode }) => {
                        return (
                          <div className="flex">
                            {headerNode}
                            {isWithHead && editNode}
                          </div>
                        );
                      }
                }
              />
            </div>
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
          </React.Fragment>
        );
      })}
      {isCanCreate && !clickBetweenData && (
        <div className="flex center m-5">
          <LazyIcon
            icon="PlusSignCircle"
            className="pointer mx-2"
            onClick={() => setNewBlockAdderPopupCom(ccom)}
          />
        </div>
      )}
      {isCanUpdate && toolProps && (
        <BottomPopup onClose={setToolProps}>
          <CmEditorComOrderToolsRedactorOrderTools {...toolProps} />
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
