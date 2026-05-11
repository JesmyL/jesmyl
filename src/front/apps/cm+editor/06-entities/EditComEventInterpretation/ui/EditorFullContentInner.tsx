import { Button } from '#shared/components';
import { CmEditorComEditBpm } from '$cm+editor/features/ComEditBpm';
import { CmEditorComEditTransposition } from '$cm+editor/features/ComEditTransposition';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { ChordVisibleVariant, cmIDB, TheCmComOrder, useCmCom } from '$cm/ext';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';

export const CmEditorEditComEventInterpretationFullContentInner = ({
  comw,
  schw,
  linkNode,
}: {
  comw: CmComWid;
  schw: IScheduleWidgetWid;
  linkNode: React.ReactNode;
}) => {
  const schPack = useLiveQuery(() => cmIDB.tb.scheduleComPacks.get(schw), [schw]);
  const com = useCmCom(comw ?? CmComWid.def, schw);
  const schedule = useLiveQuery(() => indexIDB.db.schs.get(schw), [schw]);
  const ordsInterpretation = schPack?.intp?.[comw]?.o;

  return (
    <>
      <div className="my-3 max-w-[calc(100vw-80px)]">
        Редактирование интерпритации для мероприятия
        <span className="text-x7"> {schedule?.title}</span>
      </div>
      {linkNode}

      {com && (
        <>
          <CmEditorComEditBpm
            def={com.beatsPerMinute}
            onChange={bpm => cmEditComExternalsClientTsjrpcMethods.bpmIntp({ comw: com.wid, bpm, schw })}
          />

          <CmEditorComEditTransposition
            ccom={com}
            onChange={ton => cmEditComExternalsClientTsjrpcMethods.tonIntp({ comw: com.wid, ton, schw })}
          />

          {com.orders?.map((ord, ordi) => {
            const visibleValue = ord.me.leadOrd
              ? ordsInterpretation?.[ord.me.leadOrd.wid]?.v
              : ordsInterpretation?.[ord.wid]?.v;

            const isInvisible = visibleValue === 1 ? false : visibleValue === 0 || !ord.isVisible;

            return (
              <div
                key={ord.wid}
                className={isInvisible ? 'opacity-40' : undefined}
              >
                <TheCmComOrder
                  ord={ord}
                  ordi={ordi}
                  com={com}
                  chordHardLevel={3}
                  chordVisibleVariant={ChordVisibleVariant.Maximal}
                  showInvisibles
                  asHeaderComponent={({ headerNode, ord }) => {
                    if (ord.me.isInherit) return headerNode;

                    return (
                      <div className="flex gap-3">
                        {headerNode}
                        <Button
                          icon={isInvisible ? 'ViewOff' : 'View'}
                          onClick={() =>
                            cmEditComExternalsClientTsjrpcMethods.ordVisIntp({
                              comw,
                              ordw: ord.wid,
                              schw,
                              isInv: !ord.isVisible,
                            })
                          }
                        />
                      </div>
                    );
                  }}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
