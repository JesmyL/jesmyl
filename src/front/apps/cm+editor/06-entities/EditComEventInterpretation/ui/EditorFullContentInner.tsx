import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components';
import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { CmEditorComEditBemoled } from '$cm+editor/features/ComEditBemoled';
import { CmEditorComEditBpm } from '$cm+editor/features/ComEditBpm';
import { CmEditorComEditTransposition } from '$cm+editor/features/ComEditTransposition';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { TheCmComOrder, useCmCom } from '$cm/ext';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export const CmEditorEditComEventInterpretationFullContentInner = ({
  comw,
  schw,
  linkNode,
}: {
  comw: CmComWid;
  schw: IScheduleWidgetWid;
  linkNode: React.ReactNode;
}) => {
  const com = useCmCom(comw ?? CmComWid.def, schw);
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const checkAccess = useCheckUserAccessRightsInScope();
  const canFixIntp = checkAccess('cm', 'COM_INTP', 'U');

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
            ccom={com}
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
                className={ord.isVisible ? '' : 'opacity-40'}
              >
                <TheCmComOrder
                  ord={ord}
                  ordi={ordi}
                  com={com}
                  chordHardLevel={3}
                  chordVisibleVariant={ChordVisibleVariant.Maximal}
                  showInvisibles
                  asHeaderNode={({ node, ord }) =>
                    ord.me.isInherit && ord.me.kind?.key !== CmComBlockKindKey.PlusPlus ? (
                      node
                    ) : (
                      <div className="flex gap-3">
                        {node}
                        <Button
                          icon={ord.isVisible ? 'View' : 'ViewOff'}
                          onClick={() =>
                            cmEditComExternalsClientTsjrpcMethods.ordVisIntp({
                              comw,
                              ordw: ord.wid,
                              schw,
                            })
                          }
                        />
                      </div>
                    )
                  }
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
