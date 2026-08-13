import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import {
  CmEditorComOrderToolsChangeTonType,
  CmEditorComOrderToolsModulation,
  CmEditorComOrderToolsOrderVisibility,
} from '$cm+editor/entities/com-order-tools';
import { CmEditorComEditBemoled } from '$cm+editor/features/ComEditBemoled';
import { CmEditorComEditBpm } from '$cm+editor/features/ComEditBpm';
import { CmEditorComEditTransposition } from '$cm+editor/features/ComEditTransposition';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { TheCmComOrder, useCmCom } from '$cm/ext';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { CmComOrderWid, CmComWid, CmComWidDef, ScheduleWidgetWid } from 'shared/api';

export const CmEditorEditComEventInterpretationFullContentInner = ({
  comw,
  schw,
  linkNode,
}: {
  comw: CmComWid;
  schw: ScheduleWidgetWid;
  linkNode: React.ReactNode;
}) => {
  const com = useCmCom(comw ?? CmComWidDef, schw);
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const checkAccess = useCheckUserAccessRightsInScope();
  const canFixIntp = checkAccess('cm', 'COM_INTP', 'U');
  const [editOrdw, setEditOrdw] = useState<CmComOrderWid | nil>(null);
  const onEditClose = () => setEditOrdw(null);
  const ordOnEditi = (editOrdw && com?.orders?.findIndex(o => o.wid === editOrdw)) ?? -1;
  const ordOnEdit = com?.orders?.[ordOnEditi];

  const editCom = com && new EditableCom(com.top, com.fix, com.intp);
  const editOrd = editCom && ordOnEdit && new EditableComOrder(ordOnEdit.me, editCom);

  return (
    <>
      <div className="my-3 max-w-[calc(100vw-80px)]">
        Редактирование интерпритации для мероприятия
        <span className="text-x7"> {schedule?.title}</span>
      </div>
      {linkNode}

      {canFixIntp && com && (
        <>
          <CmEditorComEditBpm
            def={com.beatsPerMinute}
            onChange={bpm => cmEditComExternalsClientTsjrpcMethods.bpmIntp({ comw: com.wid, bpm, schw })}
          />

          <CmEditorComEditTransposition
            icom={com.top}
            onChange={ton => cmEditComExternalsClientTsjrpcMethods.tonIntp({ comw: com.wid, ton, schw })}
          />

          <CmEditorComEditBemoled
            value={com.isBemoled}
            onChange={val => cmEditComExternalsClientTsjrpcMethods.bemoleIntp({ schw, comw: com.wid, val })}
          />

          {com.orders?.map((ord, ordi) => {
            return (
              <div
                key={ord.wid}
                className={ord.isVisible ? '' : 'opacity-70'}
              >
                <TheCmComOrder
                  ord={ord}
                  ordi={ordi}
                  com={com}
                  chordHardLevel={3}
                  chordVisibleVariant={ChordVisibleVariant.Maximal}
                  showInvisibles
                  asHeaderNode={({ node, ord }) => (
                    <div className="flex gap-3">
                      {node}
                      <Button
                        icon="Edit03"
                        onClick={() => setEditOrdw(ord.wid)}
                      />
                    </div>
                  )}
                />
              </div>
            );
          })}

          {!editOrd || (
            <BottomPopup onClose={onEditClose}>
              <CmEditorComOrderToolsOrderVisibility
                ord={editOrd}
                onClose={onEditClose}
                onEdit={() =>
                  cmEditComExternalsClientTsjrpcMethods.ordVisIntp({
                    comw,
                    ordw: ordOnEdit.wid,
                    schw,
                  })
                }
              />

              <CmEditorComOrderToolsModulation
                com={editCom}
                ord={editOrd}
                ordi={ordOnEditi}
                onEdit={md =>
                  cmEditComExternalsClientTsjrpcMethods.ordMudlIntp({
                    comw,
                    ordw: ordOnEdit.wid,
                    schw,
                    md,
                  })
                }
              />

              <CmEditorComOrderToolsChangeTonType
                com={editCom}
                ord={editOrd}
                onEdit={() =>
                  cmEditComExternalsClientTsjrpcMethods.ordMdSwitchIntp({
                    comw,
                    ordw: ordOnEdit.wid,
                    schw,
                  })
                }
              />
            </BottomPopup>
          )}
        </>
      )}
    </>
  );
};
